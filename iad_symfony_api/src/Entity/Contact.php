<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity
 * @UniqueEntity("email")
 * @UniqueEntity("phone_number")
 */
class Contact
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="firstname", type="string", length=255)
     * @Assert\NotBlank
     */
    private $firstname;

    /**
     * @ORM\Column(name="lastname", type="string", length=255)
     * @Assert\NotBlank
     */
    private $lastname;

    /**
     * @ORM\Column(name="email", type="string", length=255, unique=true)
     * @Assert\NotBlank
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email."
     * )
     */
    private $email;

    /**
     * @ORM\Column(name="birthday", type="datetime")
     * @Assert\NotBlank
     */
    private $birthday;

    /**
     * @ORM\Column(name="phone_code", type="string", length=5)
     * @Assert\NotBlank
     */
    private $phone_code;

    /**
     * @ORM\Column(name="phone_number", type="string", length=10, unique=true)
     * @Assert\NotBlank
     */
    private $phone_number;

    /**
     * @ORM\Column(name="active", type="boolean")
     */
    private $active;

    /**
     * @ORM\Column(name="country", type="string", length=255)
     * @Assert\NotBlank
     */
    private $country;

    /**
     * @ORM\Column(name="city", type="string", length=255)
     * @Assert\NotBlank
     */
    private $city;

    /**
     * @ORM\Column(name="postcode", type="string", length=8)
     * @Assert\NotBlank
     */
    private $postcode;

    /**
     * @ORM\Column(name="street", type="string", length=255)
     * @Assert\NotBlank
     */
    private $street;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getPhoneCode(): ?string
    {
        return $this->phone_code;
    }

    public function setPhoneCode(string $phone_code): self
    {
        $this->phone_code = $phone_code;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostcode(): ?string
    {
        return $this->postcode;
    }

    public function setPostcode(string $postcode): self
    {
        $this->postcode = $postcode;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }
}
