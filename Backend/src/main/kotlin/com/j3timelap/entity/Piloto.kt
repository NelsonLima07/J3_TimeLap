package com.j3timelap.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

@Entity
@Table(name = "piloto")
class Piloto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "datacadastro")
    var dataCadastro: LocalDate? = null

    @Column(name = "horacadastro")
    var horaCadastro: LocalTime? = null

    @Column(name = "delete_at")
    var deleteAt: LocalDateTime? = null

    @Column(nullable = false)
    var nome: String = ""

    @Column(name = "data_nascimento")
    var dataNascimento: LocalDate? = null

    var apelido: String? = null

    @Column(unique = true)
    var numero: Int? = null
}