package com.computator.lifeclock

import com.fasterxml.jackson.annotation.JsonProperty

data class ExportToEmailRequest(@JsonProperty val personalDetails: PersonalDetails,@JsonProperty val goals: List<LifeGoals>)

data class PersonalDetails( val name: String, val surname: String?, val email: String)

data class LifeGoals(val id: String, val name: String, val placement: String)
