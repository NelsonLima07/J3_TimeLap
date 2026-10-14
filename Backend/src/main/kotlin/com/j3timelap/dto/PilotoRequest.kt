package com.j3timelap.dto

import com.j3timelap.entity.Piloto
import jakarta.validation.constraints.NotBlank
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

data class PilotoRequest(
    @field:NotBlank val nome: String,
    val dataNascimento: LocalDate? = null,
    val apelido: String? = null,
    val numero: Int? = null,
    val dataCadastro: LocalDate? = null,
    val horaCadastro: LocalTime? = null,
) {
    fun toEntity(): Piloto =
        Piloto().apply {
            nome = this@PilotoRequest.nome
            dataNascimento = this@PilotoRequest.dataNascimento
            apelido = this@PilotoRequest.apelido
            numero = this@PilotoRequest.numero
            dataCadastro = this@PilotoRequest.dataCadastro ?: LocalDate.now()
            horaCadastro = this@PilotoRequest.horaCadastro ?: LocalTime.now()
        }

    fun applyTo(piloto: Piloto) {
        piloto.nome = nome
        piloto.dataNascimento = dataNascimento
        piloto.apelido = apelido
        piloto.numero = numero
        piloto.dataCadastro = dataCadastro ?: piloto.dataCadastro
        piloto.horaCadastro = horaCadastro ?: piloto.horaCadastro
    }
}