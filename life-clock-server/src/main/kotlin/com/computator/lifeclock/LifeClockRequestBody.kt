package com.computator.lifeclock

import com.fasterxml.jackson.annotation.JsonProperty

data class LifeClockRequestBody(@JsonProperty val personalDetails: PersonalDetails, @JsonProperty val goals: List<LifeGoal>)

data class PersonalDetails( @JsonProperty val name: String,@JsonProperty val surname: String?,@JsonProperty val email: String)

data class LifeGoal(val id: String, val name: String, val placement: String)
