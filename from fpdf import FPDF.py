from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Curriculum Vitae', 0, 1, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(10)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

def create_cv(data):
    pdf = PDF()
    pdf.add_page()

    pdf.chapter_title('Personal Details')
    pdf.chapter_body(f"Name: {data['name']}\nEmail: {data['email']}")

    pdf.chapter_title('Education')
    pdf.chapter_body(f"Degree: {data['degree']}\nUniversity: {data['university']}")

    pdf.chapter_title('Work Experience')
    pdf.chapter_body(f"Company: {data['company']}\nRole: {data['role']}")

    pdf.output('cv.pdf')

# Example data
data = {
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'degree': 'B.Sc. Computer Science',
    'university': 'University of Example',
    'company': 'Example Inc.',
    'role': 'Software Engineer'
}

create_cv(data)
