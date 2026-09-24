import os
import json
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        # Header rule and text on pages > 1
        if self._pageNumber > 1:
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(40, letter[1] - 35, letter[0] - 40, letter[1] - 35)
            self.drawString(40, letter[1] - 30, "Zsyio API - Localhost Postman Reference")
            self.drawRightString(letter[0] - 40, letter[1] - 30, "Base: http://localhost:8000/api/")
        
        # Footer rule and text
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 40, letter[0] - 40, 40)
        self.drawString(40, 26, "Confidential - For Internal API Testing & Postman")
        self.drawRightString(letter[0] - 40, 26, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()


def generate_urls_pdf(output_paths):
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6,
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        spaceAfter=14,
    )
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=14,
        spaceAfter=8,
    )
    method_get = ParagraphStyle('MethodGET', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor('#047857'))
    method_post = ParagraphStyle('MethodPOST', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor('#1D4ED8'))
    method_put = ParagraphStyle('MethodPUT', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor('#B45309'))
    method_patch = ParagraphStyle('MethodPATCH', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor('#7C3AED'))
    method_del = ParagraphStyle('MethodDELETE', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor('#B91C1C'))

    url_style = ParagraphStyle(
        'UrlText',
        fontName='Courier-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0F172A'),
    )
    desc_style = ParagraphStyle(
        'DescText',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#334155'),
    )
    code_block_style = ParagraphStyle(
        'CodeBlock',
        fontName='Courier',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#1E293B'),
    )

    METHOD_COLORS = {
        'GET': ('#ECFDF5', '#047857', method_get),
        'POST': ('#EFF6FF', '#1D4ED8', method_post),
        'PUT': ('#FFFBEB', '#B45309', method_put),
        'PATCH': ('#F5F3FF', '#7C3AED', method_patch),
        'DELETE': ('#FEF2F2', '#B91C1C', method_del),
    }

    endpoints = [
        # System & Health
        {
            "category": "System Health & Configuration",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/db-status/",
                    "desc": "Check dual database status (SQLite file & MongoDB Atlas connection ping)",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/config/",
                    "desc": "Retrieve global site configuration metadata",
                    "auth": "None",
                    "body": None,
                },
            ]
        },
        # Auth
        {
            "category": "Authentication (JWT)",
            "items": [
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/token/",
                    "desc": "Obtain JWT access & refresh tokens (Allowed emails: praful@zsyio.com, etc.)",
                    "auth": "None",
                    "body": '{\n  "email": "praful@zsyio.com",\n  "password": "your_password"\n}',
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/token/refresh/",
                    "desc": "Refresh expired JWT access token",
                    "auth": "None",
                    "body": '{\n  "refresh": "<refresh_token_here>"\n}',
                },
            ]
        },
        # Projects
        {
            "category": "Projects Portfolio API",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/projects/",
                    "desc": "List all portfolio projects",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/projects/",
                    "desc": "Create a new project record",
                    "auth": "None / Optional Token",
                    "body": '{\n  "title": "FinTech Mobile App",\n  "category": "Mobile App",\n  "price": 2500.00,\n  "description": "Secure banking app with biometric auth.",\n  "live_url": "https://example.com",\n  "features": ["Biometrics", "Instant Transfer"],\n  "tech_stack": ["React Native", "Django"]\n}',
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/projects/{id}/",
                    "desc": "Retrieve project details by numeric ID (e.g. /api/projects/1/)",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "PUT",
                    "url": "http://localhost:8000/api/projects/{id}/",
                    "desc": "Full update of project details by ID",
                    "auth": "None / Optional Token",
                    "body": '{\n  "title": "FinTech Mobile App Pro",\n  "category": "Mobile App",\n  "description": "Updated full description"\n}',
                },
                {
                    "method": "PATCH",
                    "url": "http://localhost:8000/api/projects/{id}/",
                    "desc": "Partial update of specific project fields",
                    "auth": "None / Optional Token",
                    "body": '{\n  "price": 3000.00\n}',
                },
                {
                    "method": "DELETE",
                    "url": "http://localhost:8000/api/projects/{id}/",
                    "desc": "Delete project by ID",
                    "auth": "None / Optional Token",
                    "body": None,
                },
            ]
        },
        # Products
        {
            "category": "Products API",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/products/",
                    "desc": "List all products",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/products/",
                    "desc": "Create a new product record",
                    "auth": "None / Optional Token",
                    "body": '{\n  "title": "Cloud Analytics Dashboard",\n  "category": "SaaS Product",\n  "price": 499.00,\n  "description": "Serverless analytics dashboard.",\n  "features": ["Real-time", "Exports"],\n  "solutions": ["AWS", "Django"]\n}',
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/products/{id}/",
                    "desc": "Retrieve product details by ID",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "PUT",
                    "url": "http://localhost:8000/api/products/{id}/",
                    "desc": "Full update of product by ID",
                    "auth": "None / Optional Token",
                    "body": '{\n  "title": "Cloud Analytics Enterprise"\n}',
                },
                {
                    "method": "DELETE",
                    "url": "http://localhost:8000/api/products/{id}/",
                    "desc": "Delete product by ID",
                    "auth": "None / Optional Token",
                    "body": None,
                },
            ]
        },
        # Services & Technologies
        {
            "category": "Services & Technologies API",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/services/services/",
                    "desc": "List all offered agency services",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/services/services/{slug}/",
                    "desc": "Retrieve service details by slug (e.g. /api/services/services/web-hosting/)",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/services/technologies/",
                    "desc": "List all technologies and stack categories",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/services/technologies/{id}/",
                    "desc": "Retrieve specific technology details by ID",
                    "auth": "None",
                    "body": None,
                },
            ]
        },
        # Cart API
        {
            "category": "Cart & Checkout API",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/cart/",
                    "desc": "List active cart sessions / items",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/cart/",
                    "desc": "Create a new cart instance",
                    "auth": "None",
                    "body": '{\n  "session_id": "test-session-123"\n}',
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/cart/{id}/add_item/",
                    "desc": "Add service item to cart by cart ID",
                    "auth": "None",
                    "body": '{\n  "service_slug": "web-hosting",\n  "quantity": 1\n}',
                },
                {
                    "method": "DELETE",
                    "url": "http://localhost:8000/api/cart/{id}/",
                    "desc": "Delete cart item or session",
                    "auth": "None",
                    "body": None,
                },
            ]
        },
        # About API
        {
            "category": "About Us API",
            "items": [
                {
                    "method": "GET",
                    "url": "http://localhost:8000/api/about/",
                    "desc": "Retrieve About Us company information",
                    "auth": "None",
                    "body": None,
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/about/",
                    "desc": "Create or populate About Us entry",
                    "auth": "None / Optional Token",
                    "body": '{\n  "hero_title": "Pioneering Next-Gen Tech",\n  "company_name": "ZSYIO",\n  "mission": "Empowering businesses with AI-driven web systems."\n}',
                },
            ]
        },
        # Chatbot & Contact
        {
            "category": "Interactive & Inquiries (Chatbot & Contact)",
            "items": [
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/chatbot/",
                    "desc": "Send prompt message to AI chatbot assistant",
                    "auth": "None",
                    "body": '{\n  "message": "What web development services do you offer?"\n}',
                },
                {
                    "method": "POST",
                    "url": "http://localhost:8000/api/contact/",
                    "desc": "Submit customer contact inquiry form",
                    "auth": "None (skipAuth)",
                    "body": '{\n  "name": "Alex Smith",\n  "email": "alex@example.com",\n  "phone": "+1234567890",\n  "service": "Web Application",\n  "message": "Looking for custom SaaS platform estimation."\n}',
                },
            ]
        },
    ]

    story = []

    # Title & Banner
    story.append(Paragraph("Zsyio Backend API - Localhost URLs", title_style))
    story.append(Paragraph("Comprehensive Endpoint Directory & Postman Testing Reference", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563EB"), spaceAfter=14))

    # Meta Info Card Table
    meta_data = [
        [
            Paragraph("<b>Base URL:</b>", desc_style),
            Paragraph("<font color='#2563EB'><b>http://localhost:8000/api/</b></font> (or http://127.0.0.1:8000/api/)", url_style),
        ],
        [
            Paragraph("<b>Databases:</b>", desc_style),
            Paragraph("Dual Database: <b>SQLite</b> (relational) + <b>MongoDB Atlas</b> (zsyio_db)", desc_style),
        ],
        [
            Paragraph("<b>Postman Setup:</b>", desc_style),
            Paragraph("Set environment variable <font color='#0D9488'><b>base_url</b></font> = <code>http://localhost:8000</code>", desc_style),
        ],
        [
            Paragraph("<b>Default Headers:</b>", desc_style),
            Paragraph("<code>Content-Type: application/json</code> | <code>Authorization: Bearer {{token}}</code> (for protected routes)", desc_style),
        ],
    ]
    meta_table = Table(meta_data, colWidths=[1.3 * inch, 5.9 * inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#E2E8F0')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#F1F5F9')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Loop through each category
    for cat in endpoints:
        story.append(Paragraph(cat['category'], section_heading))

        table_rows = [
            [
                Paragraph("<b>Method</b>", desc_style),
                Paragraph("<b>Localhost URL (Postman)</b>", desc_style),
                Paragraph("<b>Description & Notes</b>", desc_style),
            ]
        ]

        for item in cat['items']:
            method_str = item['method']
            bg_color, fg_color, m_style = METHOD_COLORS.get(method_str, ('#F1F5F9', '#334155', desc_style))

            method_cell = Paragraph(f"<b>{method_str}</b>", m_style)
            url_cell = Paragraph(item['url'], url_style)

            desc_content = f"<b>{item['desc']}</b><br/><font color='#64748B'>Auth: {item['auth']}</font>"
            if item.get('body'):
                clean_body = item['body'].replace('\n', '<br/>&nbsp;&nbsp;').replace(' ', '&nbsp;')
                desc_content += f"<br/><font color='#047857'><b>Body:</b></font><br/><code>{clean_body}</code>"
            desc_cell = Paragraph(desc_content, desc_style)

            table_rows.append([method_cell, url_cell, desc_cell])

        cat_table = Table(table_rows, colWidths=[0.85 * inch, 2.75 * inch, 3.6 * inch])
        cat_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
            ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor('#CBD5E1')),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(KeepTogether([cat_table]))
        story.append(Spacer(1, 10))

    # Postman Quick Steps Section
    story.append(Spacer(1, 8))
    story.append(Paragraph("Postman Execution Quick Guide", section_heading))
    guide_p = Paragraph(
        "<b>1. Start the Django Server:</b> Run <code>python manage.py runserver 8000</code> in <code>/backend</code>.<br/>"
        "<b>2. Check Health First:</b> Send a GET request to <code>http://localhost:8000/api/db-status/</code> to confirm both SQLite and MongoDB Atlas are online.<br/>"
        "<b>3. Authentication:</b> For protected endpoints, first call <code>POST http://localhost:8000/api/token/</code>, copy the <code>access</code> token, and set it as Bearer Token.<br/>"
        "<b>4. Import Collection:</b> You can also import <code>document/postman_collection.json</code> directly into Postman for pre-configured requests.",
        desc_style
    )
    story.append(guide_p)

    primary_out = output_paths[0]
    os.makedirs(os.path.dirname(primary_out), exist_ok=True)
    doc = SimpleDocTemplate(
        primary_out,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46,
    )
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated PDF: {primary_out}")

    import shutil
    for extra_out in output_paths[1:]:
        os.makedirs(os.path.dirname(extra_out), exist_ok=True)
        shutil.copyfile(primary_out, extra_out)
        print(f"Copied PDF: {extra_out}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_paths = [
        os.path.join(base_dir, "urls.pdf"),
        os.path.join(base_dir, "document", "urls.pdf"),
    ]
    generate_urls_pdf(target_paths)
