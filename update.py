import os
import re

# Step 1: ISR
files_to_update = [
    'src/app/[lang]/page.tsx',
    'src/app/[lang]/portfolio/page.tsx',
    'src/app/[lang]/portfolio/[slug]/page.tsx',
    'src/app/[lang]/locations/[slug]/page.tsx',
    'src/app/[lang]/solutions/[slug]/page.tsx' # just in case
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace force-dynamic with revalidate
        if "export const dynamic = 'force-dynamic';" in content:
            content = content.replace("export const dynamic = 'force-dynamic';", "export const revalidate = 3600;")
        elif "export const revalidate = 3600;" not in content:
            content = content.replace("export const runtime = 'edge';", "export const runtime = 'edge';\nexport const revalidate = 3600;")
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Step 2: Lazy loading for images
# We need to scan the whole src folder for <img and replace with <img loading="lazy" decoding="async"
def process_images(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Replace <img with <img loading="lazy" decoding="async"
                # using regex to avoid multiple replacements
                # Only if not already lazy
                
                def img_replacer(match):
                    img_tag = match.group(0)
                    if 'loading=' not in img_tag:
                        img_tag = img_tag.replace('<img', '<img loading="lazy" decoding="async"')
                    return img_tag

                content = re.sub(r'<img\b[^>]*>', img_replacer, content)
                
                # Remove lazy from hero-bg.png (Wait, hero-bg is inside next/image or img?)
                # Actually user said "не добавляй loading="lazy" к фоновому изображению hero-bg.png"
                # If there's an img tag that has hero-bg.png, we remove lazy from it
                if 'hero-bg.png' in content:
                    content = content.replace('loading="lazy" decoding="async" src="/hero-bg.png"', 'src="/hero-bg.png"')
                    # also handle cases if order is different
                    def unlazy_hero(match):
                        tag = match.group(0)
                        if 'hero-bg.png' in tag:
                            tag = tag.replace('loading="lazy"', '')
                            tag = tag.replace('decoding="async"', '')
                        return tag
                    content = re.sub(r'<img\b[^>]*>', unlazy_hero, content)

                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)

process_images('src')
print("Optimizations completed.")
