<?php

namespace App\Controller;

use App\Services\ContactService;
use Error;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api")
 */
class ContactController extends AbstractController
{
    private $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    /**
     * @Route("/contacts", name="contacts", methods={"GET"})
     */
    public function index(Request $request): JsonResponse
    {
        $contacts = $this->contactService->contacts($request->query);
        return $this->json([['message' => "Data fetched !", "data" => $contacts]]);
    }

    /**
     * @Route("/contact/new", name="create_contact", methods={"POST"})
     */
    public function new(Request $request, ValidatorInterface $validator): JsonResponse
    {
        if (!($contactData = json_decode($request->getContent(), true))) {
            throw new Error('Data must be in JSON Format !');
        }

        $response = $this->contactService->createContact($contactData, $validator);

        return $this->json($response['response'], $response['status']);
    }

    /**
     * @Route("/contact/{id}", name="contact", methods={"GET"})
     */
    public function contact($id): JsonResponse
    {
        $data = $this->contactService->contact($id);

        return $this->json(["message" => "Contact Fetched successfully !", "data" => $data]);
    }

    /**
     * @Route("/contact/update/{id}", name="update_contact", methods={"PUT"})
     */
    public function update(Request $request, $id, ValidatorInterface $validator): JsonResponse
    {
        if (!($contactData = json_decode($request->getContent(), true))) {
            throw new Error('Data must be in JSON Format !');
        }

        $response = $this->contactService->updateContact($contactData, $id, $validator);
        return $this->json($response['response'], $response['status']);
    }

    /**
     * @Route("/contact/delete/{id}", name="delete_contact", methods={"DELETE"})
     */
    public function delete($id): JsonResponse
    {
        $this->contactService->deleteContact($id);
        return $this->json(["message" => "Contact deleted successfully !", "data" => ""]);
    }

    /**
     * @Route("/contact/status/{id}", name="change_contact_status", methods={"POST"})
     */
    public function status($id): JsonResponse
    {
        $this->contactService->changeStatus($id);
        return $this->json(["data" => "status changed !"]);
    }
}
