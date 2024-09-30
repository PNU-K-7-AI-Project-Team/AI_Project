package com.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VitalAndGyroDTO {
	private TestGyroDTO testGyroDTO;
	private VitalSignDTO vitalSignDTO;
}
