<?php
if (!function_exists('formatNumber')) {
    function formatNumber(int|float $amount): string
    {
        return number_format($amount, 0, ',', '.');
    }
}

if (!function_exists('rupiah')) {
    function rupiah(int|float $amount, $prefix = 'Rp. '): string
    {
        return $prefix . formatNumber($amount);
    }
}