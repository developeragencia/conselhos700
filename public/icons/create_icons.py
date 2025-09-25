from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename, color="#6366f1", text="🔮"):
    img = Image.new('RGB', (size, size), color)
    draw = ImageDraw.Draw(img)
    font_size = size // 3
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), text, fill="white", font=font)
    img.save(filename)

sizes = [72, 96, 128, 144, 152, 192, 384, 512]
for size in sizes:
    create_icon(size, f"icon-{size}x{size}.png")

create_icon(96, "tarot-shortcut.png", "#8b5cf6", "🃏")
create_icon(96, "astro-shortcut.png", "#06b6d4", "⭐")
create_icon(96, "dashboard-shortcut.png", "#10b981", "📊")

print("Ícones criados com sucesso!")
