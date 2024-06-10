export function mapToDto<Entity, Dto>(
  entity: Entity,
  dtoClass: new () => Dto,
  mappings: Partial<Record<keyof Entity, keyof Dto>>
): Dto {
  const dto = new dtoClass();
  for (const entityKey in mappings) {
    const dtoKey = mappings[entityKey as keyof Entity];
    if (dtoKey && entity.hasOwnProperty(entityKey)) {
      (dto as any)[dtoKey] = (entity as any)[entityKey];
    }
  }
  return dto;
}
