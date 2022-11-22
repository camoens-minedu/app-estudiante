export interface IPersonaValidateDto {
  ID_PERSONA: number;
  ID_TIPO_DOCUMENTO: number;
  NUMERO_DOCUMENTO_PERSONA: string;
  APELLIDO_PATERNO_PERSONA: string;
  APELLIDO_MATERNO_PERSONA: string;
  NOMBRE_PERSONA: string;
  personaInstituciones: PersonaInstitucione[];
}

export interface PersonaInstitucione {
  CORREO: string;
}
