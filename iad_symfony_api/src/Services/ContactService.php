<?php

namespace App\Services;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\InputBag;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;


// Contact Service class to handle actions 
class ContactService
{
    private $em;
    private $contactRepo;

    public function __construct(ContactRepository $contactRepo, ManagerRegistry $doctrine)
    {
        $this->contactRepo = $contactRepo;
        $this->em = $doctrine->getManager();
    }

    // Check if user exists, by id, and return user. else throw a not found exception
    private function checkContact($id)
    {
        if (!($contact = $this->contactRepo->find($id))) {
            throw new NotFoundHttpException('No Contact found for id ' . $id);
        }

        return $contact;
    }

    // checks by the birthday given if user has majority and and return the birthday, otherwise throw an unthorized error 
    private function majorContactBirthday($birthday_req_body)
    {
        $birthday = (new DateTime())->createFromFormat('d/m/Y', $birthday_req_body);

        $birthday_data = [
            "year" => $birthday->format('Y'),
            "month" => $birthday->format('m'),
            "day" => $birthday->format('d')
        ];

        $today = [
            "year" => (new DateTime('NOW'))->format('Y'),
            "month" => (new DateTime('NOW'))->format('m'),
            "day" => (new DateTime('NOW'))->format('d'),
        ];

        $age = $today['year'] - $birthday_data['year'];

        if ($today['month'] < $birthday_data['month']) {
            $age = $age - 1;
        }

        if ($today['month'] == $birthday_data['month'] && $today['day'] < $birthday_data['day']) {
            $age = $age - 1;
        }

        if ($age < 18) {
            throw new UnauthorizedHttpException("", 'Contact must have majority !');
        }

        return $birthday;
    }

    // format data to show
    private function formattedData(Contact $contact)
    {
        return [
            "firstname" => $contact->getFirstname(),
            "lastname" => $contact->getLastname(),
            "email" => $contact->getEmail(),
            "birthday" => $contact->getBirthday()->format('d/m/Y'),
            "phone_number" => $contact->getPhoneNumber(),
            "phone_code" => $contact->getPhoneCode(),
            "address" => $contact->getStreet() . ', ' .
                $contact->getPostcode() . ' ' .
                $contact->getCity() . ', ' .
                $contact->getCountry(),
            "active" => $contact->isActive()
        ];
    }

    // Handle errors validated with the Contact Entity constraints
    private function errorsHandler($errors)
    {
        if (count($errors) > 0) {
            foreach ($errors as $violation) {
                $errorsData[$violation->getPropertyPath()][] = $violation->getMessage();
            }
            $data = ["message" => "Action failed !", "data" => $errorsData];

            return ["response" => $data, "status" => 401];
        }
    }

    // Accept a query parameter, and return contacts filtered if query if passed.
    // If not query passed returns all contacts
    public function contacts(InputBag $params)
    {
        $contacts = ($params->get('active') !== null) ?
            $this->contactRepo->findActiveOrInactive(($params->get('active')))
            :
            $this->contactRepo->findAll();

        $contactsData = [];
        foreach ($contacts as $contact) {
            $contactsData[] = $this->formattedData($contact);
        }

        return $contactsData;
    }

    public function createContact($contactData, $validator)
    {
        $contact = new Contact();

        $birthday = $this->majorContactBirthday($contactData['birthday']);

        $contact->setFirstname($contactData['firstname'])
            ->setLastname($contactData['lastname'])
            ->setEmail($contactData['email'])
            ->setPhoneNumber($contactData['phone_number'])
            ->setPhoneCode($contactData['phone_code'])
            ->setActive($contactData['active'])
            ->setBirthday($birthday)
            ->setCity($contactData['city'])
            ->setPostcode($contactData['postcode'])
            ->setStreet($contactData['street'])
            ->setCountry($contactData['country']);


        if (($errors = $this->errorsHandler($validator->validate($contact))) !== null) {
            return $errors;
        }

        $this->em->persist($contact);
        $this->em->flush();

        $data = ["message" => "Contact created successfully !", "data" => $this->formattedData($contact)];
        return ["response" => $data, "status" => 201];
    }

    public function contact($id)
    {
        $contact = $this->checkContact($id);
        $data = $this->formattedData($contact);

        return $data;
    }

    public function updateContact($contactData, $id, $validator)
    {
        $contact = $this->checkContact($id);

        empty($contactData['firstname']) ? true : $contact->setFirstname($contactData['firstname']);
        empty($contactData['lastname']) ? true : $contact->setLastname($contactData['lastname']);
        empty($contactData['email']) ? true : $contact->setEmail($contactData['email']);
        empty($contactData['phone_number']) ? true : $contact->setPhoneNumber($contactData['phone_number']);
        empty($contactData['phone_code']) ? true : $contact->setPhoneCode($contactData['phone_code']);
        empty($contactData['active']) ? true : $contact->setActive($contactData['active']);
        empty($contactData['city']) ? true : $contact->setCity($contactData['city']);
        empty($contactData['street']) ? true : $contact->setStreet($contactData['street']);
        empty($contactData['country']) ? true : $contact->setCountry($contactData['country']);
        empty($contactData['postcode']) ? true : $contact->setPostcode($contactData['postcode']);

        if (isset($contactData['birthday'])) {
            $birthday = $this->majorContactBirthday($contactData['birthday']);
            $contact->setBirthday($birthday);
        }

        if (($errors = $this->errorsHandler($validator->validate($contact))) !== null) {
            return $errors;
        }

        $this->em->flush();
        $data = ["message" => "Contact updated successfully !", "data" => $this->formattedData($contact)];
        return ['response' => $data, 'status' => 203];
    }

    public function deleteContact($id)
    {
        $contact = $this->checkContact($id);

        $this->em->remove($contact);
        $this->em->flush();
    }



    public function changeStatus($id)
    {

        $this->checkContact($id);

        $this->contactRepo->changeStatus($id);
        $this->em->flush();
    }
}
