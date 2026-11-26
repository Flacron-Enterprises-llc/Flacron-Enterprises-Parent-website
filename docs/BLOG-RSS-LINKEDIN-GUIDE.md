# Blog + RSS + LinkedIn: Step-by-step Guide

Yeh guide shuru se aakhir tak batati hai ke naya **Blog** (`/blog`) aur **RSS feed** (`/rss.xml`) live kaise karna hai, aur har nayi post khud **LinkedIn company page** par kaise jaaye. Har step chhota hai. Upar se neeche ek ek kar ke karte jayein aur har step ke baad us ka **"Check"** zaroor karein.

---

## 0. Pehle samajh lein: system kaise chalta hai

```
Admin panel (/admin/blog)  →  Firestore (blog_posts)  →  /blog page
       post likho                 post save hoti hai        +  /rss.xml feed
                                                                   ↓
                                                     Zapier har 15 min feed dekhta hai
                                                                   ↓
                                                     LinkedIn company page par post
```

- Aap sirf **admin panel mein post likh kar Publish** karte hain.
- Website (`/blog`) aur feed (`/rss.xml`) khud update ho jaate hain.
- **LinkedIn khud RSS feed nahi parhta.** Is liye beech mein ek tool (Zapier) lagana hai jo feed dekhta rahe aur nayi post LinkedIn par daal de. Yeh setup sirf ek dafa karna hai (Step 6).

---

## 1. Checklist: kya ho chuka, kya baaqi hai

| # | Kaam | Kaun karega | Status |
|---|------|-------------|--------|
| 1 | Blog pages, RSS feed, admin panel ka code | Developer | ✅ Ho gaya |
| 2 | Code test (typecheck, lint, security tests, screenshots) | Developer | ✅ Ho gaya |
| 3 | Code ko GitHub par merge karna aur deploy karna | Developer | ✅ Ho gaya (PR #12, Amplify job #37) |
| 4 | Hosting par env variables check karna | Developer | ✅ Ho gaya (sab pehle se set the) |
| 5 | Firestore ke saath test (save, publish, schedule, delete) | Developer | ✅ Ho gaya (production par) |
| 6 | Feed validator + LinkedIn Post Inspector | Developer | ✅ Ho gaya (valid feed, preview sahi) |
| 7 | Zapier account + LinkedIn page admin se connect | Rodrigue | ⬜ Step 6.1–6.2 |
| 8 | Zapier se RSS → LinkedIn automation lagana | Developer | ⬜ Step 6.3 |
| 9 | Pehli asli post publish kar ke LinkedIn par check karna | Aap | ⬜ Step 7 |

---

## 2. Code deploy karna

Code abhi computer par hai, live site par nahi. Abhi agar aap `https://www.flacronenterprises.com/rss.xml` kholein to **404** aayega. Yeh normal hai.

1. Changes ko ek nayi branch par commit karein, jaise `feat/blog-rss`.
2. GitHub par Pull Request banayein aur `main` mein merge karein.
3. Site **AWS Amplify** par host hai, to `main` mein merge hote hi deploy khud shuru ho jaata hai. Agar aisa nahi hota to AWS Console → **Amplify** → apni app → `main` branch → **Redeploy this version** dabayein.
4. Deploy hone mein lagbhag 5–10 minute lagte hain. Amplify mein status **Deployed** (hara) ho jaaye to aage barhein.

**✅ Check:** browser mein yeh teen links kholein:
- `https://www.flacronenterprises.com/blog`: blog page dikhna chahiye.
- `https://www.flacronenterprises.com/rss.xml`: XML text dikhna chahiye (code jaisa lagta hai, yeh theek hai).
- `https://flacronenterprises.com/rss.xml` (bina www): yeh khud `www` wale link par chala jaata hai. Yeh pehle se set hai.

---

## 3. Hosting par env variables check karna

Env variables woh secret settings hain jo website ko Firebase aur admin password se jorti hain. Shayad yeh pehle se set hon, kyun ke Apps aur Leads admin bhi inhi par chalte hain. Phir bhi ek dafa check kar lein.

1. AWS Console kholein → **Amplify** → apni app (Flacron website) par click karein.
2. Left menu mein **Hosting → Environment variables** kholein. Purane console mein yeh **App settings → Environment variables** hota hai.
3. Check karein ke yeh sab mojood hain aur khaali nahi hain:

| Variable | Kis kaam ka | Agar na ho to |
|----------|-------------|---------------|
| `FIREBASE_PROJECT_ID` | Firebase project ka naam | Blog posts save nahi hongi |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | Blog posts save nahi hongi |
| `FIREBASE_PRIVATE_KEY_B64` (ya `FIREBASE_PRIVATE_KEY`) | Firebase ki secret key | Blog posts save nahi hongi |
| `ADMIN_PASSWORD` | `/admin/login` ka password | Admin panel mein login nahi hoga |
| `ADMIN_SECRET` | Login session ko secure rakhta hai | Login unsafe default par chalega, zaroor set karein |
| `NEXT_PUBLIC_SITE_URL` (optional) | Site ka address | Na ho to `https://www.flacronenterprises.com` khud use hota hai, theek hai |

4. Agar koi variable add ya change kiya to Amplify mein **Redeploy** karna zaroori hai, warna nayi value apply nahi hogi.

> ⚠️ Yeh values kabhi WhatsApp, email ya screenshot mein share na karein. Yeh passwords jaisi secret hain.

---

## 4. Firestore ke saath test (sab se zaroori test)

Firestore mein kuch **banana nahi** parta. `blog_posts` naam ka collection pehli post save karte waqt khud ban jaata hai. Security rules badalne ki bhi zaroorat nahi, kyun ke website server-side admin access se likhti hai.

### 4.1 Admin panel mein login
1. `https://www.flacronenterprises.com/admin/login` kholein.
2. `ADMIN_PASSWORD` wala password daalein → login.
3. Left sidebar mein **Blog** par click karein.

**✅ Check:** "Blog" page khulna chahiye. Agar laal box mein *"Firestore is not configured or unreachable"* likha aaye to Step 3 ke Firebase variables galat ya missing hain.

### 4.2 Test draft banana
1. Upar right mein **New post** dabayein.
2. Yeh bharein:
   - **Title:** `Test post - please ignore`
   - **Summary:** `Testing the blog.`
   - **Content:** `Hello **world**`
   - **Category:** koi bhi
3. Sidebar mein ✅ **"Keep out of the RSS feed"** tick karein. Bahut zaroori hai, taa ke yeh test post galti se LinkedIn par na chali jaaye, chahe Zapier on ho.
4. **Save draft** dabayein.

**✅ Check (Firebase Console):**
1. `https://console.firebase.google.com` kholein → apna project chunein.
2. Left menu → **Build → Firestore Database** → **Data** tab.
3. Collections ki list mein `blog_posts` nazar aana chahiye, aur us ke andar `test-post-please-ignore` document.

**✅ Check (website):** `/blog` kholein. Test post **nahi** dikhni chahiye, kyun ke woh draft hai.

### 4.3 Publish ka test
1. Admin → Blog → test post par click karein → **Publish** dabayein.
2. `/blog` kholein (page refresh karein). Test post ab **dikhni chahiye**.
3. `/rss.xml` kholein. Test post **nahi** honi chahiye, kyun ke "Keep out of RSS" tick hai. Agar yeh dikhe to batayein.

### 4.4 Schedule ka test (optional)
1. Test post edit karein → **Publish date** ko kal ki date par set karein → **Schedule** dabayein.
2. Admin list mein us ke saath neela **Scheduled** label aana chahiye, aur `/blog` se post ghaib ho jaani chahiye.

### 4.5 Saaf-safai
Admin → Blog → test post ke saamne 🗑️ (Delete) dabayein → confirm karein. `/blog` par ab dobara welcome post dikhegi.

> Jab tak koi asli post publish nahi hoti, `/blog` aur feed par ek **"Welcome to the Flacron Enterprises Blog"** post dikhti hai taa ke page khaali na lage. Pehli asli post publish hote hi woh khud hat jaati hai.

---

## 5. Feed ko validator se check karna

1. `https://validator.w3.org/feed/` kholein.
2. Box mein `https://www.flacronenterprises.com/rss.xml` daalein → **Check** dabayein.
3. Upar **"This is a valid RSS feed"** aana chahiye. Neeche choti *recommendations* (peeli) aa sakti hain, woh ignore kar dein. Sirf laal **errors** masla hain.

**Link preview check (LinkedIn image):**
1. `https://www.linkedin.com/post-inspector/` kholein (LinkedIn login chahiye).
2. Kisi blog post ka link daalein, jaise `https://www.flacronenterprises.com/blog/welcome-to-the-flacron-enterprises-blog` → **Inspect**.
3. Title, description aur image sahi dikhne chahiye. LinkedIn post bhi aisi hi dikhegi.

---

## 6. LinkedIn automation (Zapier), sirf ek dafa

### 6.1 Pehle: LinkedIn page par admin access
Zapier sirf us account se company page par post kar sakta hai jo page ka admin ho.
1. LinkedIn kholein → apni **Flacron Enterprises company page** par jaayein.
2. Agar upar **Admin view / Admin tools** nazar aaye to aap admin hain.
3. Aap ka role **Super admin** ya **Content admin** hona chahiye. Check karne ke liye: page → **Admin tools → Manage admins**.
4. Agar admin nahi hain to page ke Super admin se kahein ke aap ko add kar de.

### 6.2 Zapier account
1. `https://zapier.com` par **Sign up** karein (company email behtar hai).
2. Free plan se shuru kar sakte hain. Free plan feed ko lagbhag har 15 minute baad check karta hai aur mahine ke tasks limited hote hain (1 LinkedIn post = 1 task). Mahine mein kuch posts ke liye kaafi hai. Taaza limits `https://zapier.com/pricing` par dekh lein.

### 6.3 Zap banana
1. Zapier mein **+ Create → Zaps** dabayein.
2. **Trigger (pehla dabba):**
   1. Search mein `RSS by Zapier` likh kar chunein.
   2. **Event:** `New Item in Feed` → **Continue**.
   3. **Feed URL:** `https://www.flacronenterprises.com/rss.xml` (www ke saath likhein). Username/password khaali chhorein.
   4. **Continue → Test trigger**. Zapier feed ki latest post dikhayega (title, link waghera). Is ka matlab connection theek hai.
3. **Action (doosra dabba):**
   1. Search mein `LinkedIn` chunein.
   2. **Event:** `Create Company Update` → **Continue**.
   3. **Account:** "Sign in" → apne LinkedIn account se login → **Allow**. Yeh wohi account ho jo page admin hai (6.1).
   4. **Company Page:** list se **Flacron Enterprises** chunein.
   5. **Update Content / Comment** (post ka text): neeche wala template banayein. `{{ }}` wali cheezein feed ke fields hain jo aap box mein click kar ke list se chunte hain:

      ```
      {{Title}}

      {{Description}}

      Read more 👉 {{Link}}

      #AI #FlacronEnterprises
      ```
   6. Agar link/URL ka alag field ho (jaise *Content URL*) to us mein bhi `Link` chunein. Image ke field mein feed ka `Enclosure URL` ya `Media Content URL` chunein, jo cover image hai. Field ke naam Zapier waqt ke saath badal deta hai. Jo field link ya image se milta julta ho, wohi chunein.
4. **Test step:**
   > ⚠️ Zapier ka action test **sach mein LinkedIn par post kar deta hai**. Ya to yeh step **Skip test** kar dein, ya test kar ke LinkedIn se woh post baad mein delete kar dein.
5. Upar Zap ka naam rakhein, jaise `Flacron Blog → LinkedIn`, phir **Publish** dabayein. Zap **On** ho jayega.

**Zaroori baat:** Zap on hone ke baad sirf **nayi** posts LinkedIn par jaati hain. Feed mein jo pehle se hain (jaise welcome post) woh dobara post nahi hoti.

### 6.4 Zapier ke alawa options (agar Zapier pasand na ho)
- **Make.com**: RSS "watch feed items" module + LinkedIn company post module. Sasta hai, thora mushkil.
- **Buffer / Hootsuite**: in mein RSS se posts queue karne ka feature hota hai (paid plans).
- **dlvr.it**: khaas RSS → social media ke liye bana hai.

Sab mein feed URL wohi rahega: `https://www.flacronenterprises.com/rss.xml`.

---

## 7. Pehli asli post (end-to-end test)

1. Admin → Blog → **New post**.
2. Asli content likhein (neeche Section 8 dekhein). "Keep out of the RSS feed" **tick na karein**.
3. **Publish** dabayein.
4. Fauran check karein: `/blog` aur `/rss.xml` mein post aa gayi.
5. **15–20 minute** intezar karein (Zapier ka check interval).
6. LinkedIn company page kholein: post title, summary, link aur image ke saath aa jaani chahiye.
7. Zapier → **Zap history** mein bhi entry nazar aayegi (hari = kamyab, laal = error, us par click kar ke wajah parhein).

🎉 Agar yeh chal gaya to setup mukammal hai. Aage se sirf post likh kar Publish karna hai.

---

## 8. Roz-marra: achi post kaise likhein

| Field | Kya likhna hai | Tip |
|-------|---------------|-----|
| **Title** | Post ka heading | 50–70 characters behtar. Wohi LinkedIn ki pehli line banega |
| **URL slug** | Title se khud banta hai | **Publish ke baad kabhi na badlein** (neeche "Zaroori rules" dekhein) |
| **Summary** | 1–2 jumle | Cards, Google aur **LinkedIn post ka text** yahi hai. Dilchasp likhein (max 300) |
| **Content** | Poora article | Markdown mein (neeche cheat-sheet) |
| **Category** | News, Product Launch, Feature Update, Announcement, Education, Insights, Blog | Sahi category chunein, blog page par filter isi se bante hain |
| **Publish date** | Kab live ho | Aage ki date = schedule. Us waqt khud live hogi aur LinkedIn par jaayegi |
| **Tags** | `AI, Construction` (comma se alag) | 2–5 kaafi hain |
| **Cover image URL** | Tasveer ka `https://` link | **1200 × 630** size best hai. Yahi LinkedIn post ki tasveer hai |
| **Keep out of RSS** | Tick = LinkedIn par nahi jaayegi | Andar ki ya chhoti posts ke liye |

**Cover image kahan rakhein?** Admin mein abhi image upload ka button nahi hai, sirf link chalta hai. Tasveer kisi bhi public jagah upload kar ke us ka `https://` link paste karein, jaise Firebase Storage, ya developer se kahein ke `public/blog/` folder mein daal de. Phir link `/blog/tasveer.jpg` jaisa hoga.

**Content likhne ka tareeqa (Markdown cheat-sheet):**

| Likhein | Nateeja |
|---------|---------|
| `## Heading` | Bara sub-heading |
| `### Chhota heading` | Chhota sub-heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[Book a demo](/book-demo)` | Link |
| `- item` (har line par) | Bullet list |
| `1. item` | Numbered list |
| `> Quote` | Quote box |
| `![Tasveer ka bayan](https://...jpg)` | Article ke andar tasveer |
| Khaali line | Naya paragraph |

Likhne ke baad editor mein **Preview** dabayein aur dekh lein ke post kaisi dikhegi.

---

## 9. Zaroori rules (in se masle nahi honge)

1. **Publish ke baad slug na badlein.** Purana link toot jayega aur Zapier usay *nayi* post samajh kar LinkedIn par **dobara** daal dega.
2. **Post delete kar ke dobara na banayein.** Ghalti theek karni ho to **Edit → Update** karein. Edit karne se LinkedIn par dobara post nahi jaati.
3. **Test posts** par hamesha "Keep out of the RSS feed" tick karein.
4. LinkedIn par galat post chali jaaye to LinkedIn page se manually delete karein. Website se delete karne se LinkedIn wali post nahi hatti.

---

## 10. Extra: alag category ke liye alag feed

Agar kabhi sirf product launches LinkedIn par bhejni hon, ya kisi aur platform ke liye alag feed chahiye ho:

| Feed | URL |
|------|-----|
| Sab posts | `https://www.flacronenterprises.com/rss.xml` |
| Sirf Company News | `.../rss.xml?category=news` |
| Sirf Product Launch | `.../rss.xml?category=product-launch` |
| Sirf Feature Update | `.../rss.xml?category=feature-update` |
| Sirf Announcement | `.../rss.xml?category=announcement` |
| Sirf Education | `.../rss.xml?category=education` |
| Sirf Insights | `.../rss.xml?category=marketing` |
| Sirf Blog | `.../rss.xml?category=blog` |

Zapier mein Feed URL ki jagah inhein mein se koi bhi daal sakte hain.

---

## 11. Masla aaye to (troubleshooting)

| Masla | Wajah | Hal |
|-------|-------|-----|
| `/rss.xml` par 404 | Code deploy nahi hua | Step 2 |
| Admin Blog par "Firestore is not configured or unreachable" | Firebase env variables missing/galat | Step 3, phir Redeploy |
| Admin login nahi ho raha | `ADMIN_PASSWORD` galat ya set nahi | Step 3 |
| Post publish ki magar `/blog` par nahi | Publish date future mein hai (Scheduled) | Date check karein |
| Post `/blog` par hai magar feed mein nahi | "Keep out of RSS" tick hai | Untick → Update |
| Feed mein hai magar LinkedIn par nahi | Zapier ne abhi check nahi kiya, ya Zap off hai | 15–20 min intezar; Zapier → Zap history dekhein |
| Zap history mein laal error | LinkedIn connection expire, ya admin access nahi | Zapier → Apps → LinkedIn → Reconnect; Step 6.1 |
| LinkedIn post mein tasveer nahi | Cover image missing, ya link `https://` nahi | Cover image URL daalein; Post Inspector (Step 5) se check |
| LinkedIn par purani tasveer/title | LinkedIn ka cache | Post Inspector mein link dobara **Inspect** karein |
| Ek post LinkedIn par do dafa | Slug badla ya post delete kar ke dobara banayi | Rules (Section 9) follow karein |

---

## 12. Developer ne kya test kiya, kya baaqi hai

**Test ho chuka:**
- Feed valid XML hai, sahi format mein (title, link, guid, date, summary, poora article, image).
- `/blog`, category filter, article page, 404 page, sitemap mein blog links.
- Security: post mein HTML/JavaScript daalne se woh chalta nahi (XSS se bachao), `javascript:` links block, galat data save nahi hota (14/14 tests pass).
- Draft aur scheduled posts website aur feed par nahi dikhtin.
- Desktop, tablet (1024px) aur mobile par screenshots. Naya header "More" dropdown ke saath.
- TypeScript typecheck aur lint clean.

- Production par Firestore ka poora test: admin login, save, draft chhupna, publish, sitemap, schedule, validation, delete (sab pass). Test post delete kar di gayi.
- W3C validator: feed valid. LinkedIn Post Inspector: title, description, image aur "Article" type sahi.

**Baaqi:**
- Zapier account aur LinkedIn connection (Step 6). Yeh Rodrigue ke LinkedIn admin account se hoga.
- Pehli asli post se end-to-end check (Step 7).
