import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

def generate_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=26,
        alignment=1, # Center
        textColor=colors.HexColor('#000000')
    )

    contact_style = ParagraphStyle(
        'ContactText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        alignment=1, # Center
        textColor=colors.HexColor('#111111')
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#000000'),
        spaceBefore=8,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#111111')
    )

    bold_body_style = ParagraphStyle(
        'BoldBodyText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#000000')
    )

    italic_body_style = ParagraphStyle(
        'ItalicBodyText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#222222')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=12.5,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2,
        textColor=colors.HexColor('#111111')
    )

    tech_stack_style = ParagraphStyle(
        'TechStackStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#333333')
    )

    story = []

    # 1. Header Name
    story.append(Paragraph("Jay Sitapara", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Rajkot, Gujarat &nbsp;|&nbsp; +91 9104297422 &nbsp;|&nbsp; jaysitapara5103@gmail.com", contact_style))
    story.append(Paragraph("linkedin.com/in/jay-sitapara-170b161b8 &nbsp;|&nbsp; github.com/jaysitapara", contact_style))
    story.append(Spacer(1, 8))

    def add_section_header(title):
        story.append(Paragraph(title, heading_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceBefore=1, spaceAfter=6))

    # 2. Summary
    add_section_header("Summary")
    story.append(Paragraph(
        "Full Stack Software Engineer with 1.5+ years of experience in MERN stack development. Skilled in Node.js, "
        "Express.js, React.js, TypeScript, MongoDB, REST APIs, and JWT authentication. Experienced with OpenAI API, "
        "AWS, Stripe, Firebase, and third-party integrations.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # 3. Education
    add_section_header("Education")
    
    edu_table_1 = [
        [Paragraph("<b>Marwadi University</b>", bold_body_style), Paragraph("Rajkot, Gujarat", ParagraphStyle('R', parent=body_style, alignment=2))],
        [Paragraph("<i>Master of Computer Applications (MCA)</i>", italic_body_style), Paragraph("", body_style)]
    ]
    t1 = Table(edu_table_1, colWidths=[380, 160])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Spacer(1, 4))

    edu_table_2 = [
        [Paragraph("<b>Saurashtra University</b>", bold_body_style), Paragraph("Rajkot, Gujarat", ParagraphStyle('R', parent=body_style, alignment=2))],
        [Paragraph("<i>Bachelor of Computer Applications (BCA)</i>", italic_body_style), Paragraph("", body_style)]
    ]
    t2 = Table(edu_table_2, colWidths=[380, 160])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Spacer(1, 6))

    # 4. Technical Skills
    add_section_header("Technical Skills")
    skills = [
        ("Programming Languages:", "JavaScript (ES6+), TypeScript"),
        ("Frontend:", "React.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design"),
        ("Backend:", "Node.js, Express.js, REST API Development, Middleware, Socket.IO"),
        ("Databases:", "MongoDB, SQL, Schema Design, Indexing"),
        ("Authentication & Security:", "JWT Authentication, Role-Based Access Control (RBAC), API Security, Input Validation"),
        ("Cloud & Integrations:", "AWS, OpenAI API, Stripe, Firebase Cloud Messaging (FCM)"),
        ("Developer Tools:", "Git, GitHub, Postman, VS Code, npm"),
        ("Software Development:", "Object-Oriented Programming (OOP), MVC Architecture, Agile Methodology, Debugging, Code Review, Performance Optimization")
    ]
    for label, val in skills:
        story.append(Paragraph(f"<b>{label}</b> {val}", body_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))

    # 5. Professional Experience
    add_section_header("Professional Experience")

    # Exp 1
    exp_table_1 = [
        [Paragraph("<b>Empyreal Infotech</b>", bold_body_style), Paragraph("Jul 2025 – Present", ParagraphStyle('R', parent=bold_body_style, alignment=2))],
        [Paragraph("<i>Full Stack Software Engineer (MERN)</i>", italic_body_style), Paragraph("<i>Rajkot, Gujarat</i>", ParagraphStyle('R', parent=italic_body_style, alignment=2))]
    ]
    t_exp1 = Table(exp_table_1, colWidths=[380, 160])
    t_exp1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp1)
    story.append(Spacer(1, 3))

    exp1_bullets = [
        "&ndash; Built cloud-based MERN applications using TypeScript for 5+ enterprise clients, maintaining 99% uptime.",
        "&ndash; Designed REST APIs and MongoDB schemas, reducing database retrieval time by 50% and improving application security.",
        "&ndash; Integrated OpenAI API, Stripe, and AWS services into multiple applications while building reusable React components that reduced development time by 50%.",
        "&ndash; Worked with cross-functional teams in an Agile environment to deliver software updates 20% faster while maintaining high code quality."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 6))

    # Exp 2
    exp_table_2 = [
        [Paragraph("<b>Empyreal Infotech</b>", bold_body_style), Paragraph("Jan 2025 – Jun 2025", ParagraphStyle('R', parent=bold_body_style, alignment=2))],
        [Paragraph("<i>MERN Stack Developer Intern</i>", italic_body_style), Paragraph("<i>Rajkot, Gujarat</i>", ParagraphStyle('R', parent=italic_body_style, alignment=2))]
    ]
    t_exp2 = Table(exp_table_2, colWidths=[380, 160])
    t_exp2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp2)
    story.append(Spacer(1, 3))

    exp2_bullets = [
        "&ndash; Built commercial web applications and delivered 3 major features during the internship.",
        "&ndash; Designed and optimized REST APIs and MongoDB queries to support JWT authentication for over 1,000 daily requests.",
        "&ndash; Built reusable React.js components and resolved more than 50 critical bugs before production releases.",
        "&ndash; Collaborated in Agile sprints to deliver more than 10 frontend modules on schedule while maintaining code quality.",
        "&ndash; Participated in API testing, debugging, and code reviews, resolving more than 50 issues before production deployment."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 6))

    # 6. Projects
    add_section_header("Projects")

    # Project 1
    p1 = []
    p1.append(Paragraph("<b>Scout Robotics &mdash; Railway Monitoring Dashboard</b>", bold_body_style))
    p1.append(Paragraph("React.js | Node.js | Express.js | MongoDB | AWS", tech_stack_style))
    p1.append(Spacer(1, 2))
    p1_bullets = [
        "&ndash; Created a railway monitoring dashboard for a USA-based client to track more than 500 trains daily.",
        "&ndash; Developed responsive data visualization modules integrated with AWS services, providing real-time insights with less than 200ms latency.",
        "&ndash; Built REST APIs to process live data streams and generate more than 5 scheduled reports and system health alerts daily.",
        "&ndash; Optimized React.js components, reducing dashboard load time by 35% and improving user experience.",
        "&ndash; Collaborated with stakeholders to resolve production issues, achieving a 95% resolution rate within 48 hours."
    ]
    for b in p1_bullets:
        p1.append(Paragraph(b, bullet_style))
    p1.append(Spacer(1, 6))
    story.append(KeepTogether(p1))

    # Project 2
    p2 = []
    p2.append(Paragraph("<b>OVE &mdash; Women’s Health & Period Tracking Platform</b>", bold_body_style))
    p2.append(Paragraph("React.js | Node.js | Express.js | MongoDB | OpenAI API | Stripe | Firebase", tech_stack_style))
    p2.append(Spacer(1, 2))
    p2_bullets = [
        "&ndash; Engineered a full-stack healthcare platform supporting more than 75,000 concurrent users across web and mobile applications.",
        "&ndash; Architected MongoDB schemas and established access controls to securely manage over 50,000 health records.",
        "&ndash; Integrated OpenAI API to provide AI-powered health assistance, increasing daily user engagement by 40%.",
        "&ndash; Configured Stripe, Firebase Cloud Messaging (FCM), and scheduled cron jobs to process over 2,000 monthly transactions and notifications.",
        "&ndash; Built a modular backend architecture with middleware validation, reducing server-side errors by 50%."
    ]
    for b in p2_bullets:
        p2.append(Paragraph(b, bullet_style))
    p2.append(Spacer(1, 6))
    story.append(KeepTogether(p2))

    # Project 3
    p3 = []
    p3.append(Paragraph("<b>Chance AI &mdash; AI-Powered Dating Platform</b>", bold_body_style))
    p3.append(Paragraph("React.js | Node.js | TypeScript | Express.js | MongoDB | Socket.IO | OpenAI API", tech_stack_style))
    p3.append(Spacer(1, 2))
    p3_bullets = [
        "&ndash; Engineered an AI-powered dating platform using React.js, Node.js, and TypeScript with a scalable application architecture.",
        "&ndash; Integrated OpenAI API to generate personalized user profiles, increasing profile completion by 25%.",
        "&ndash; Built real-time messaging using Socket.IO with message delivery under 50ms.",
        "&ndash; Implemented secure REST APIs and authentication to protect data for more than 1,000 active users.",
        "&ndash; Automated recurring subscription and payment workflows using Stripe, increasing subscription conversion by 15%."
    ]
    for b in p3_bullets:
        p3.append(Paragraph(b, bullet_style))
    p3.append(Spacer(1, 6))
    story.append(KeepTogether(p3))

    # Project 4
    p4 = []
    p4.append(Paragraph("<b>ARCC &mdash; Smart Biking & Ride Analytics Platform</b>", bold_body_style))
    p4.append(Paragraph("React.js | Node.js | Express.js | MongoDB | Socket.IO | JWT", tech_stack_style))
    p4.append(Spacer(1, 2))
    p4_bullets = [
        "&ndash; Built a real-time ride analytics platform for more than 1,000 active cyclists, processing live telemetry data including distance, duration, and speed.",
        "&ndash; Designed REST APIs with JWT authentication and request validation to ensure secure and reliable data processing.",
        "&ndash; Enabled live location tracking using Socket.IO, supporting real-time synchronization for over 100 concurrent users.",
        "&ndash; Created MongoDB schemas for efficient storage and analysis of historical ride data.",
        "&ndash; Refactored backend modules and reusable frontend components, reducing future development effort by an estimated 25%."
    ]
    for b in p4_bullets:
        p4.append(Paragraph(b, bullet_style))
    story.append(KeepTogether(p4))

    doc.build(story)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == '__main__':
    workspace_dir = "/Users/admin/Documents/Jay Personal/untitled folder"
    os.makedirs(os.path.join(workspace_dir, "resume"), exist_ok=True)
    generate_resume(os.path.join(workspace_dir, "resume", "Jay_Sitapara_Resume.pdf"))
    generate_resume(os.path.join(workspace_dir, "Jay_Sitapara_Resume.pdf"))
