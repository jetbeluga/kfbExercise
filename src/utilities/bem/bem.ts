const delimiters = {
  element: '-',
  modifier: '--',
};

interface StringBoolMap {
  [key: string]: boolean;
}

type StringSet = StringBoolMap | string[] | string;

function convertStringSetToArray(stringSet: StringSet | null): string[] {
  if (stringSet === null) {
    return [];
  }

  if (Array.isArray(stringSet)) {
    return stringSet;
  }

  if (typeof stringSet === 'string') {
    return [stringSet];
  }

  return Object.entries(stringSet)
    .filter(([, value]) => value)
    .map(([key]) => key);
}

/**
 * Renders a BEM (according to our guidelines) class array
 * based on a block, element, modifiers and extra classes.
 */
export function bem(
  blockName: string,
  elementName: string | null = null,
  modifiers: StringSet | null = null,
  extraClasses: StringSet | null = null,
): string[] {
  const fixedModifiers = convertStringSetToArray(modifiers);
  const fixedExtraClasses = convertStringSetToArray(extraClasses);

  let baseClass = blockName;
  if (elementName !== null) {
    baseClass += delimiters.element + elementName;
  }

  const modifierClasses = fixedModifiers.map(
    (modifier) => baseClass + delimiters.modifier + modifier,
  );

  return [baseClass, ...modifierClasses, ...fixedExtraClasses];
}

/**
 * Returns a function that renders a BEM (according to our guidelines) class array
 * based on an element, modifiers and extra classes.
 */
export function useBem(blockName: string) {
  return (
    elementName: string | null = null,
    modifiers: StringSet | null = null,
    extraClasses: StringSet | null = null,
  ): string[] => bem(blockName, elementName, modifiers, extraClasses);
}
