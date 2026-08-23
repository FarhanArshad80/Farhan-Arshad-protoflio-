import jsPDF from 'jspdf';
import { PORTFOLIO_DATA } from '../data/portfolio';

export function generateCV(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const W = 210;
  const H = 297;
  const ML = 16;
  const MR = 16;
  const CW = W - ML - MR;

  let y = 0;

  const addAccentBar = () => {
    doc.setFillColor(109, 40, 217);
    doc.rect(0, 0, 5, H, 'F');
  };

  const checkPage = (needed = 15) => {
    if (y + needed > H - 14) {
      doc.addPage();
      y = 18;
      addAccentBar();
    }
  };

  const sectionHeader = (title: string) => {
    checkPage(14);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.3);
    doc.line(ML, y, W - MR, y);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(109, 40, 217);
    doc.text(title, ML, y);
    y += 5.5;
  };

  // === PAGE 1: ACCENT BAR ===
  addAccentBar();
  y = 18;

  // NAME
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 15, 15);
  doc.text(PORTFOLIO_DATA.profile.name, ML, y);
  y += 7;

  // TITLE
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text(PORTFOLIO_DATA.profile.title, ML, y);
  y += 7;

  // DIVIDER
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(ML, y, W - MR, y);
  y += 4;

  // CONTACT ROW
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  const contactStr =
    PORTFOLIO_DATA.profile.email +
    '   |   ' +
    PORTFOLIO_DATA.profile.location +
    '   |   github.com/FarhanArshad80   |   linkedin.com/in/farhan-arshad-aa5991370';
  const contactLines = doc.splitTextToSize(contactStr, CW);
  doc.text(contactLines, ML, y);
  y += contactLines.length * 4 + 5;

  // SUMMARY
  sectionHeader('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  const bioLines = doc.splitTextToSize(PORTFOLIO_DATA.profile.bio, CW);
  doc.text(bioLines, ML, y);
  y += bioLines.length * 4.2 + 5;

  // SKILLS
  sectionHeader('TECHNICAL SKILLS');
  checkPage(10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  const skills = PORTFOLIO_DATA.skills.map((skill) => `${skill.name} (${skill.techTags.join(', ')})`);
  const skillLines = doc.splitTextToSize(skills.join('  •  '), CW);
  doc.text(skillLines, ML, y);
  y += skillLines.length * 4.2 + 3;

  // EXPERIENCE
  sectionHeader('WORK EXPERIENCE');
  PORTFOLIO_DATA.experiences.forEach((exp) => {
    checkPage(20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 15, 15);
    doc.text(exp.role, ML, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(109, 40, 217);
    doc.text(exp.company, ML, y);
    doc.setTextColor(100, 100, 100);
    doc.text(`${exp.period}  •  ${exp.location}`, W - MR, y, { align: 'right' });
    y += 5;

    exp.highlights.forEach((h) => {
      checkPage(8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
      const hl = doc.splitTextToSize(`\u2022 ${h}`, CW - 4);
      doc.text(hl, ML + 2, y);
      y += hl.length * 4;
    });

    checkPage(6);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 90, 200);
    doc.text(`Skills: ${exp.skills.join(', ')}`, ML + 2, y);
    y += 8;
  });

  // EDUCATION
  sectionHeader('EDUCATION');
  PORTFOLIO_DATA.education.forEach((edu) => {
    checkPage(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 15, 15);
    doc.text(edu.degree, ML, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(109, 40, 217);
    doc.text(edu.institution, ML, y);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.period, W - MR, y, { align: 'right' });
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    const dl = doc.splitTextToSize(edu.details, CW);
    doc.text(dl, ML, y);
    y += dl.length * 4.2 + 6;
  });

  // FOOTER on all pages
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `${PORTFOLIO_DATA.profile.name}  \u2022  ${PORTFOLIO_DATA.profile.email}  \u2022  Page ${i} of ${total}`,
      W / 2,
      H - 7,
      { align: 'center' }
    );
  }

  doc.save('Farhan-Arshad-CV.pdf');
}
