<?php

use App\Models\Coa;
use App\Models\Journal;
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
        Schema::create('journal_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Journal::class)->constrained();
            $table->foreignIdFor(Coa::class)->constrained();
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
        Schema::dropIfExists('journal_details');
    }
};
