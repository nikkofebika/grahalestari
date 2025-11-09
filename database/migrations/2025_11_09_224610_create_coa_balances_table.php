<?php

use App\Models\Coa;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coa_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Coa::class)->constrained();
            // $table->foreignIdFor(Tenant::class)->constrained();
            $table->string('period_month', 2);
            $table->char('period_year', 4);
            $table->integer('opening_balance')->unsigned()->default(0);
            $table->integer('debit')->unsigned()->default(0);
            $table->integer('credit')->unsigned()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coa_balances');
    }
};
