export default function (date: string, options?: object) {
  return new Date(date).toLocaleDateString('fr-FR', options)
}
