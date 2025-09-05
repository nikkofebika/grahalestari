<?php

use App\Models\Coa;
use App\Models\Tenant;
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
        Schema::create('citizen_fee_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Tenant::class)->constrained();
            $table->foreignIdFor(Coa::class, 'debit_coa_id')->constrained();
            $table->foreignIdFor(Coa::class, 'credit_coa_id')->constrained();
            $table->string('name', 100);
            $table->integer('fix_amount')->unsigned()->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            // created/updated/deleted info
            $table->integer('created_by_id')->unsigned()->nullable();
            $table->integer('updated_by_id')->unsigned()->nullable();
            $table->integer('deleted_by_id')->unsigned()->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citizen_fee_categories');
    }
};
