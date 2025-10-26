from PIL import Image, ImageDraw, ImageFont

def create_timer_icon(size):
    # 背景色（紫のグラデーション風）
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)

    # 円を描画（時計の外枠）
    margin = size // 10
    circle_bbox = [margin, margin, size - margin, size - margin]
    draw.ellipse(circle_bbox, fill='white', outline='#764ba2', width=size//20)

    # 時計の針を描画
    center = size // 2

    # 短針（時針）
    hour_hand_length = size // 4
    draw.line([(center, center), (center + hour_hand_length * 0.7, center - hour_hand_length * 0.7)],
              fill='#667eea', width=size//15)

    # 長針（分針）
    minute_hand_length = size // 3
    draw.line([(center, center), (center, center - minute_hand_length)],
              fill='#764ba2', width=size//20)

    # 中心の点
    center_size = size // 15
    draw.ellipse([center - center_size, center - center_size,
                  center + center_size, center + center_size],
                 fill='#667eea')

    return img

# 192x192と512x512のアイコンを生成
icon_192 = create_timer_icon(192)
icon_192.save('icon-192.png')
print('Created icon-192.png')

icon_512 = create_timer_icon(512)
icon_512.save('icon-512.png')
print('Created icon-512.png')
