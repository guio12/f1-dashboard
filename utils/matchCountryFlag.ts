export default function (countryName: string): string | undefined {
  const flags: Record<string, string> = {
    Bahrain: 'i-flag-bh-4x3',
    'Saudi Arabia': 'i-flag-sa-4x3',
    Australia: 'i-flag-au-4x3',
    Japan: 'i-flag-jp-4x3',
    China: 'i-flag-cn-4x3',
    USA: 'i-flag-us-4x3',
    'United States': 'i-flag-us-4x3',
    Italy: 'i-flag-it-4x3',
    Monaco: 'i-flag-mc-4x3',
    Canada: 'i-flag-ca-4x3',
    Spain: 'i-flag-es-4x3',
    Austria: 'i-flag-at-4x3',
    UK: 'i-flag-gb-eng-4x3',
    Hungary: 'i-flag-hu-4x3',
    Belgium: 'i-flag-be-4x3',
    Netherlands: 'i-flag-nl-4x3',
    Azerbaijan: 'i-flag-az-4x3',
    Singapore: 'i-flag-sg-4x3',
    Mexico: 'i-flag-mx-4x3',
    Brazil: 'i-flag-br-4x3',
    Qatar: 'i-flag-qa-4x3',
    UAE: 'i-flag-ae-4x3',
    Portugal: 'i-flag-pt-4x3',
    France: 'i-flag-fr-4x3',
  }

  return flags[countryName]
}
