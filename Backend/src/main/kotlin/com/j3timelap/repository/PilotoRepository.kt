package com.j3timelap.repository

import com.j3timelap.entity.Piloto
import io.quarkus.hibernate.orm.panache.kotlin.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import java.time.LocalDateTime

@ApplicationScoped
class PilotoRepository : PanacheRepository<Piloto> {
    fun findByNumero(numero: Int): Piloto? = find("numero", numero).firstResult()

    fun findAtivos(): List<Piloto> = list("deleteAt is null")

    fun desativar(id: Long): Boolean {
        val piloto = findById(id) ?: return false
        piloto.deleteAt = LocalDateTime.now()
        return true
    }
}