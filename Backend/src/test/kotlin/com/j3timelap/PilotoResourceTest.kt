package com.j3timelap

import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.hamcrest.Matchers.greaterThan
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

@io.quarkus.test.junit.QuarkusTest
class PilotoResourceTest {
    @Test
    fun createAndListPiloto() {
        given()
            .contentType(ContentType.JSON)
            .body("""{"nome":"Ayrton Senna","apelido":"Senna","numero":1}""")
            .`when`().post("/pilotos")
            .then()
            .statusCode(201)

        given()
            .`when`().get("/pilotos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
    }
}