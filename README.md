# Frontend Fejlesztői Dokumentáció

## Projekt neve
**Vizsgaremek Frontend**

## Áttekintés
Ez egy **React + TypeScript** alapú webalkalmazás, amely **SCSS**-t használ stíluskezelésre, és a **Vite** buildrendszert alkalmazza fejlesztéshez és fordításhoz.

## Technológiák
- React
- TypeScript
- Vite
- SCSS
- React Router


## Telepítési és futtatási útmutató

1. **Projekt klónozása:**
   ```bash
   git clone https://github.com/abraham-bence/vizsgaremek_frontend.git
   cd vizsgaremek_frontend
   ```
2. **Függőségek telepítése:**
   ```bash
    npm install
   ```
3. **Fejlesztői szerver indítása:**
   ```bash
    npm run dev
    ```

## Fejlesztési irányelvek
- Minden új komponens a components/ mappába kerüljön.
- Oldalak a pages/ mappába szervezve.
- API hívások a services/ mappában legyenek.
- Globális stílusokat a styles/ mappában tároljuk.
- Új logikai funkciókat a hooks/ vagy utils/ mappába helyezzünk.
