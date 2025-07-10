<?php

namespace App\Enums;

enum OpenApiExample: string
{
    case ID = "1";
    case NAME = 'Nikko Fe';
    case EMAIL = 'user@gmail.com';
    case PASSWORD = 'secret#$%';
    case PHONE = "085691977176";
    case URL = "https://keparat-desa.com";
    case IMAGE_URL = 'https://app.melandas-indonesia.com/images/img-not-available.jpg';
    case TIMESTAMP = "2023-02-27T22:40:30.000000Z";
    case DATETIME = "2020-12-20 22:40:30";
    case DATE = "2020-12-20";
    case USER_TYPE = UserType::USER->value;
}
