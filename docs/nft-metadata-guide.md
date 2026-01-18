# NFT Metadata Hosting Guide

This guide explains how to host your SigLife NFT metadata for production use.

## Metadata Files

The metadata JSON files for each stage are located in `assets/nft-metadata/`:

| Stage | File | Rarity |
|-------|------|--------|
| Student | `student.json` | Common |
| Intern | `intern.json` | Common |
| Employee | `employee.json` | Uncommon |
| Side Hustler | `side_hustler.json` | Uncommon |
| Entrepreneur | `entrepreneur.json` | Rare |
| CEO | `ceo.json` | Epic |
| Investor | `investor.json` | Epic |
| Sigma Elite | `sigma_elite.json` | Legendary |

---

## Hosting Options

### Option 1: IPFS via NFT.Storage (Recommended for Testing)

**Free** and easy to use.

1. **Create an account:** [https://nft.storage](https://nft.storage)

2. **Upload images first:**
   - Go to Files → Upload
   - Upload each stage image (PNG/JPG)
   - Copy the CID for each

3. **Update metadata JSON files:**
   - Replace `PLACEHOLDER_*_IMAGE` with IPFS URIs:
     ```json
     "image": "ipfs://<CID>"
     ```

4. **Upload metadata JSON files:**
   - Upload each JSON file
   - Copy the CID for each

5. **Update `constants/cnft-config.ts`:**
   ```typescript
   export const STAGE_METADATA_URIS: Record<StageId, string> = {
     student: "ipfs://<STUDENT_JSON_CID>",
     intern: "ipfs://<INTERN_JSON_CID>",
     // ... etc
   }
   ```

---

### Option 2: Arweave (Recommended for Production)

**Permanent storage** for ~$0.01 per file.

1. **Install arweave-deploy:**
   ```bash
   npm install -g arweave-deploy
   ```

2. **Create Arweave wallet:**
   - Get AR tokens from [arweave.org](https://arweave.org)
   - Download wallet JSON file

3. **Upload images:**
   ```bash
   arweave-deploy --wallet wallet.json --file assets/images/student-badge.png
   ```

4. **Update metadata with Arweave URIs:**
   ```json
   "image": "https://arweave.net/<TX_ID>"
   ```

5. **Upload metadata:**
   ```bash
   arweave-deploy --wallet wallet.json --file assets/nft-metadata/student.json
   ```

6. **Update `constants/cnft-config.ts`** with Arweave URIs.

---

### Option 3: Bundlr/Irys (Easiest for Arweave)

1. **Install Irys CLI:**
   ```bash
   npm install -g @irys/sdk
   ```

2. **Fund your account (can use SOL):**
   ```bash
   irys fund 0.1 -n devnet -t solana -w ~/.config/solana/id.json
   ```

3. **Upload files:**
   ```bash
   irys upload assets/nft-metadata/student.json -n devnet -t solana -w ~/.config/solana/id.json
   ```

---

## Updating the App

After hosting, update `constants/cnft-config.ts`:

```typescript
export const STAGE_METADATA_URIS: Record<StageId, string> = {
  student: "https://arweave.net/abc123...",
  intern: "https://arweave.net/def456...",
  employee: "https://arweave.net/ghi789...",
  side_hustler: "https://arweave.net/jkl012...",
  entrepreneur: "https://arweave.net/mno345...",
  ceo: "https://arweave.net/pqr678...",
  investor: "https://arweave.net/stu901...",
  sigma_elite: "https://arweave.net/vwx234...",
}
```

---

## Creating Badge Images

If you need to generate badge images:

1. **Design Requirements:**
   - Size: 512x512 or 1024x1024 pixels
   - Format: PNG with transparency
   - Style: Consistent with app theme

2. **Tools:**
   - Figma, Canva, or Adobe Illustrator
   - AI generators like Midjourney/DALL-E

3. **Naming Convention:**
   - `student-badge.png`
   - `intern-badge.png`
   - etc.

---

## Quick Test (Devnet)

For quick devnet testing without permanent hosting:

1. Use a free image hosting service temporarily
2. Point metadata URIs to those images
3. Note: These won't persist for production!

Example with placeholder:
```json
"image": "https://picsum.photos/512/512?random=0"
```
