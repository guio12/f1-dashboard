export default function slugify(name: string) {
  return String(name)
    .normalize('NFKD') // divise les caractères accentués en caractères de base et en marques diacritiques
    .replace(/[\u0300-\u036f]/g, '') // supprime tous les accents
    .trim() 
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // supprime les caractères non-alphanumériques
    .replace(/\s+/g, '-') // remplace les espaces par des tirets
    .replace(/-+/g, '-'); // supprime les tirets successifs
}