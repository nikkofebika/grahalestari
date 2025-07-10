<?php

namespace App\Http\Controllers;

abstract class Controller
{
    const SUCCESS_SESSION_KEY = 'success';
    const INFO_SESSION_KEY = 'info';
    const WARNING_SESSION_KEY = 'warning';
    const ERROR_SESSION_KEY = 'error';
    const CREATED_MESSAGE = 'Data created successfully';
    const UPDATED_MESSAGE = 'Data updated successfully';
    const DELETED_MESSAGE = 'Data deleted successfully';

    protected int $per_page = 15;

    public function __construct()
    {
        $this->per_page = min(request('per_page', $this->per_page), 100);
    }

    protected function createdResponse(string $message = self::CREATED_MESSAGE)
    {
        return response()->json(['message' => $message], 201);
    }

    protected function updatedResponse(string $message = self::UPDATED_MESSAGE)
    {
        return response()->json(['message' => $message], 200);
    }

    protected function deletedResponse(string $message = self::DELETED_MESSAGE)
    {
        return response()->json(['message' => $message], 200);
    }
}
