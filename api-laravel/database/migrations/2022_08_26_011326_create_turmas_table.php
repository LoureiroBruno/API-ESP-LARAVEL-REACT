<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turmas', function (Blueprint $table) {
            $table->increments('id');
            $table->year('ano_de_execução')->nullable();
            $table->enum('nível_de_ensino', ['Fundamental', 'Médio'])->nullable();
            $table->string('série', 10)->nullable();
            $table->enum('turno', ['Manhã', 'Tarde', 'Noite'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turmas');
    }
};
