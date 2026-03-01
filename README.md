# Research Publications - Instructions

## How to Add New Research Papers

### 1. Upload Your PDF
Place your PDF file in the `research-papers/` directory with a descriptive filename:
- Use lowercase with hyphens: `lawn-care-pricing-2025.pdf`
- Include year in filename for easy organization
- Examples: `mowing-height-rct-2025.pdf`, `customer-survey-2024.pdf`

### 2. Update publications.html

Copy one of the existing publication templates and modify it with your research details:

```html
<div style="background: #F8F9FA; padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; border-left: 5px solid #4285F4;">
    <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div style="flex: 1; min-width: 280px;">
            <div style="display: inline-block; background: #4285F4; color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem; margin-bottom: 0.75rem;">
                <i class="fas fa-flask"></i> [Study Type]
            </div>
            <h3 style="color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.5rem;">
                [Your Paper Title]
            </h3>
            <p style="color: var(--medium-gray); font-style: italic; margin-bottom: 0.5rem;">
                [Author(s)]. ([Year]). Choppalawnz Research Publications.
            </p>
        </div>
        <div>
            <a href="research-papers/your-filename.pdf" class="btn btn-primary" style="white-space: nowrap;" target="_blank">
                <i class="fas fa-download"></i> Download PDF
            </a>
        </div>
    </div>
    <p style="color: var(--dark-gray); line-height: 1.6; margin-bottom: 1rem;">
        <strong>Abstract:</strong> [Your abstract text here - 2-3 sentences summarizing key findings]
    </p>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; color: var(--medium-gray); font-size: 0.9rem;">
        <span><i class="fas fa-calendar" style="color: #4285F4;"></i> Published: [Month Year]</span>
        <span><i class="fas fa-tag" style="color: #4285F4;"></i> [Category]</span>
        <span><i class="fas fa-chart-bar" style="color: #4285F4;"></i> Evidence Level: [High/Medium/Low]</span>
    </div>
</div>
```

### 3. Study Type Colors and Icons

Use these predefined color schemes based on study type:

- **Meta-Analysis**: `#4285F4` (Blue) - `<i class="fas fa-flask"></i>`
- **RCT**: `#34A853` (Green) - `<i class="fas fa-microscope"></i>`
- **Survey**: `#FF6B9D` (Pink) - `<i class="fas fa-poll"></i>`
- **Audit**: `#4ECDC4` (Teal) - `<i class="fas fa-clipboard-check"></i>`
- **Case Study**: `#667eea` (Purple) - `<i class="fas fa-book-open"></i>`
- **Industry Report**: `#FF9800` (Orange) - `<i class="fas fa-chart-line"></i>`

### 4. Research Categories

Choose from these categories:
- Business Studies
- Horticultural Practices
- Social Impact
- Sustainability
- Equipment & Technology
- Market Analysis

### 5. Evidence Levels

- **High**: Meta-analyses, RCTs, systematic reviews
- **Medium**: Surveys, audits, cohort studies
- **Low**: Case studies, observational studies, opinions

## Google Scholar Optimization

### PDF Requirements
Your PDF should include on the first page:
1. **Title** - Clear and descriptive
2. **Author(s)** - Full name(s)
3. **Date** - Publication date
4. **Abstract** - Summary of findings
5. **Keywords** - 5-7 relevant keywords

### Metadata Tags
The page includes these Google Scholar meta tags:
- `citation_title`
- `citation_author`
- `citation_publication_date`
- `citation_pdf_url`
- `citation_journal_title`

### Example PDF First Page Layout:
```
[Title in Large Font]
Comparative Effectiveness of Lawn Care Pricing Models in New Zealand

[Author]
Jack Campbell

[Institution/Organization]
Choppalawnz, Wellington, New Zealand

[Date]
October 2025

[Abstract]
This meta-analysis examines pricing strategies across lawn care businesses...
[200-300 words]

[Keywords]
lawn care, pricing models, business strategy, New Zealand, customer retention
```

## Tips for Google Scholar Indexing

1. **Wait Time**: Google Scholar can take 1-2 weeks to index new papers
2. **PDF Format**: Ensure text is selectable (not scanned images)
3. **Citations**: Include proper references to establish credibility
4. **Consistency**: Use same author name format across all papers
5. **Quality**: Well-formatted, professional documents are more likely to be indexed

## Need Help?

Contact: choppalawnz@gmail.com
