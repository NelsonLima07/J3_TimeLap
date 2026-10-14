package com.j3timelap.resource

import com.j3timelap.dto.PilotoRequest
import com.j3timelap.entity.Piloto
import com.j3timelap.repository.PilotoRepository
import jakarta.transaction.Transactional
import jakarta.validation.Valid
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.DELETE
import jakarta.ws.rs.DefaultValue
import jakarta.ws.rs.GET
import jakarta.ws.rs.NotFoundException
import jakarta.ws.rs.POST
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.Produces
import jakarta.ws.rs.QueryParam
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import java.net.URI

@Path("/pilotos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
class PilotoResource(private val repository: PilotoRepository) {
    @GET
    fun list(@QueryParam("ativos") @DefaultValue("true") ativos: Boolean): List<Piloto> =
        if (ativos) repository.findAtivos() else repository.listAll()

    @GET
    @Path("/{id}")
    fun get(@PathParam("id") id: Long): Piloto =
        repository.findById(id) ?: throw NotFoundException("Piloto nao encontrado: $id")

    @POST
    @Transactional
    fun create(@Valid request: PilotoRequest): Response {
        val entity = request.toEntity()
        repository.persist(entity)
        return Response.created(URI.create("/pilotos/${entity.id}")).entity(entity).build()
    }

    @PUT
    @Path("/{id}")
    @Transactional
    fun update(@PathParam("id") id: Long, @Valid request: PilotoRequest): Piloto {
        val piloto = repository.findById(id) ?: throw NotFoundException("Piloto nao encontrado: $id")
        request.applyTo(piloto)
        return piloto
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    fun delete(@PathParam("id") id: Long): Response {
        val desativado = repository.desativar(id)
        if (!desativado) throw NotFoundException("Piloto nao encontrado: $id")
        return Response.noContent().build()
    }
}