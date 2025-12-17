# Atouts Propreté

Site vitrine statique pour une entreprise de ménage/nettoyage aux Sables-d'Olonne. Le projet utilise uniquement HTML, CSS et JavaScript vanilla.

## Arborescence
```
/public
  index.html
  services.html
  devis.html
  apropos.html
  contact.html
  mentions-legales.html
  confidentialite.html
  main.css
  script.js
  /assets
    placeholder.svg
```

## Utilisation
- Ouvrir `public/index.html` dans un navigateur ou utiliser une extension type *Live Server* pour un aperçu local.
- Tous les styles sont dans `public/main.css` et le JavaScript dans `public/script.js`.
- Les coordonnées (téléphone, email, adresse) sont présentes dans le header/footer et les formulaires ; remplacez les placeholders directement dans les fichiers HTML.
- Le JSON-LD LocalBusiness est déclaré dans `public/index.html` (mettre à jour téléphone, adresse et URL).

## Fonctionnalités
- Menu mobile (bouton « Menu ») et retour en haut.
- FAQ accordéon sur la page d'accueil.
- Validation front sur les formulaires de devis et de contact + messages d'état simulés.
- Stockage local optionnel sur le formulaire de devis pour conserver les données saisies.
