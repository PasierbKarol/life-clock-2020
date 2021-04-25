package com.computator.lifeclock

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.http.HttpStatus

data class LifeClockRequestBody(@JsonProperty val personalDetails: PersonalDetails, @JsonProperty val goals: List<LifeGoal>)

data class PersonalDetails(@JsonProperty val name: String, @JsonProperty val surname: String?, @JsonProperty val email: String)

data class LifeGoal(val id: String, val name: String, val placement: String)

data class ResponseModel(val responseJSON: String?, val pdf: ByteArray?, val error: String, val httpCode: HttpStatus)
