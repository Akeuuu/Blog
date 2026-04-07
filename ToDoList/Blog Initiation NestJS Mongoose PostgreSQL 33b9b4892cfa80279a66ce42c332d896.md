# Blog Initiation NestJS Mongoose / PostgreSQL

**Sélectionner:** Exercices
**Niveau:** Débutant
**Stack:** Nest (https://www.notion.so/Nest-dee64e89eeb247ee91d69e77cd93bdc9?pvs=21), MongoDB (https://www.notion.so/MongoDB-b8c30a4551a448b6ab872891e3c6d733?pvs=21)

---

# Présentation du Projet

## Objectif

Développer une API REST complète pour une plateforme de blog avec authentification, gestion d’articles, interactions sociales, stockage de fichiers et gestion avancée des erreurs.

---

## Technologies

| Catégorie | Technologie |
| --- | --- |
| Framework | NestJS + TypeScript |
| Base de données | MongoDB (Mongoose) | | PostgreSQL (Prisma)
| Stockage | RustFS (S3-compatible) |
| Authentification | JWT + bcrypt |
| Documentation | Swagger UI |
| API Externe Traduction | API DeepL |
| Gestion des erreurs | Exception Filters, réponses standardisées pour le front-end |
| Repository Pattern | Découplage MongoDB / PostgreSQL (Prisma) |

---

# Tâches du Projet

## Configuration (à faire au fur et à mesure)

- [ ] Initialiser le projet NestJS avec TypeScript
- [ ] Configurer MongoDB avec Mongoose
- [ ] Configurer les variables d'environnement
- [ ] Configurer Swagger UI à `/api`
- [ ] Configurer RustFS pour le stockage S3-compatible
- [ ] Configurer un module pour les requêtes API externes

---

## Authentification et Utilisateurs

### Gestion des Utilisateurs

- [ ] Créer le module Users avec CRUD complet
- [ ] Implémenter la validation de mot de passe fort
- [ ] Ajouter les endpoints (inscription, connexion, profil, liste utilisateurs pour admin, modification et suppression)
- [ ] Protéger les routes avec JWT et contrôle d'accès basé sur les rôles

---

## Gestion du Contenu

### Articles (Posts)

- [ ] Créer le module Posts avec CRUD complet
- [ ] Implémenter recherche, filtrage par tags, pagination et tri
- [ ] Ajouter jusqu’à 4 images par article (stockage S3)

### Commentaires

- [ ] Créer le module Comments avec création, modification et suppression
- [ ] Intégrer le système de réactions
- [ ] Afficher auteur et dates

---

## Stockage de Fichiers (S3)

- [ ] Configurer le client S3 (RustFS)
- [ ] Stocker photos de profil et images des articles
- [ ] Générer URLs présignées (72h)
- [ ] Valider formats et taille maximale

---

### Tags

- [ ] Créer module Tags
- [ ] Permettre plusieurs tags par post
- [ ] Implémenter tags populaires (trending)
- [ ] Supprimer tags avec cascade pour admin

---

### Réactions

- [ ] Créer module Reactions
- [ ] Implémenter toggle automatique
- [ ] Comptage en temps réel
- [ ] Limiter 1 réaction/utilisateur/contenu

---

### Multilinguisme

- [ ] Intégrer API DeepL pour traductions
- [ ] Implémenter cache des traductions
- [ ] Supporter 6 langues: Espagnol, Français, Italien, Néerlandais, Russe, Japonais

---

### Gestion Avancée

- [ ] Créer un système de gestion des erreurs robuste, avec filtres globaux et réponses standardisées pour faciliter le front-end (Bad : NOT_FOUND -> Good : POST_NOT_FOUND)
- [ ] Implémenter le repository pattern pour permettre de changer facilement la base de données entre MongoDB et PostgreSQL

