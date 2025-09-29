import { useCallback, useEffect, useState } from 'react';

const navLinks = [
  { href: 'home', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'services', label: 'Services' },
  { href: 'case-studies', label: 'Case Studies' },
  { href: 'contact', label: 'Contact' },
];

const heroStats = [
  { value: '₹100+ Cr', label: 'Cost savings delivered' },
  { value: '8%', label: 'Average OEE improvement' },
  { value: '100+', label: 'Production lines optimized' },
  { value: '15+', label: 'Years of experience' },
];

const educationCredentials = [
  'Manufacturing Management - IIM (NITIE Mumbai)',
  'Lean Six Sigma Green Belt Certified',
  'Project Management & Agile Methodologies',
  'Advanced Analytics & AI Applications',
];

const industryFocus = ['FMCG & Packaging', 'Automotive Components', 'Process Industries', 'Consumer Goods'];

const services = [
  {
    title: 'Operational Excellence & Lean Implementation',
    items: [
      'Enterprise-wide Lean Six Sigma deployment',
      'Value Stream Mapping and process optimization',
      'Total Productive Maintenance (TPM) programs',
      'Overall Equipment Effectiveness (OEE) improvement',
      'Continuous improvement culture development',
      'Self-managed team implementation',
    ],
  },
  {
    title: 'Digital Manufacturing & Industry 4.0',
    items: [
      'Manufacturing Execution System (MES) implementation',
      'Industrial IoT integration and data analytics',
      'Predictive maintenance systems',
      'Low-cost automation solutions',
      'Real-time KPI dashboards and reporting',
      'AI/ML applications for quality and yield improvement',
    ],
  },
  {
    title: 'Supply Chain & Planning Optimization',
    items: [
      'Sales & Operations Planning (S&OP) design',
      'Demand forecasting and inventory optimization',
      'Strategic procurement and supplier development',
      'Network optimization and logistics cost reduction',
      'Working capital optimization',
      'End-to-end supply chain visibility',
    ],
  },
  {
    title: 'Cost Engineering & Financial Performance',
    items: [
      'SKU-level profitability analysis',
      'Cost-to-serve optimization',
      'Budget planning and variance control',
      'Capital expenditure evaluation',
      'Energy cost reduction strategies',
      'Material cost optimization programs',
    ],
  },
];

const caseStudies = [
  {
    title: 'Enterprise Lean Transformation - Ashirvad by Aliaxis',
    details: [
      {
        heading: 'Challenge',
        description:
          'Multi-plant manufacturing company needed to improve operational efficiency, reduce costs, and establish sustainable continuous improvement practices across their operations.',
      },
      {
        heading: 'Solution',
        description:
          'Led comprehensive lean transformation including MES-IoT implementation across 100+ production lines, established self-managed teams, deployed TPM practices, and created robust governance frameworks.',
      },
      {
        heading: 'Approach',
        description:
          'Conducted current state mapping, implemented pilot programs, scaled successful initiatives, and built internal capability through extensive training programs for 200+ operations staff.',
      },
    ],
    metrics: [
      { value: '₹20 Cr', label: 'Business impact achieved' },
      { value: '8%', label: 'OEE improvement' },
      { value: '₹13 Cr', label: 'Automation savings' },
      { value: '2%', label: 'Total cost reduction' },
    ],
  },
  {
    title: 'Production Excellence Program - Manjushree Technopack',
    details: [
      {
        heading: 'Challenge',
        description:
          'Large packaging manufacturer with 2500+ SKUs needed to improve throughput, reduce waste, and optimize resource utilization across multiple production facilities.',
      },
      {
        heading: 'Solution',
        description:
          'Applied Theory of Constraints methodology to identify and resolve bottlenecks, implemented comprehensive scrap management system, and redesigned production planning processes.',
      },
      {
        heading: 'Results',
        description:
          'Delivered significant improvements in EBITDA through enhanced productivity, waste reduction, and optimized manpower utilization while maintaining quality standards.',
      },
    ],
    metrics: [
      { value: '₹16 Cr', label: 'EBITDA improvement' },
      { value: '8%', label: 'Throughput increase' },
      { value: '300%', label: 'Scrap reduction' },
      { value: '10%', label: 'Operating cost reduction' },
    ],
  },
];

const contactDetails = [
  { label: 'Email', value: 'contact@humchumco.com' },
  { label: 'Phone', value: '+91 XXXXX XXXXX' },
  { label: 'Location', value: 'Bengaluru, Karnataka' },
  { label: 'Response', value: 'Within 24 hours' },
];

const initialFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  'bot-field': '',
};

const App = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [headerElevated, setHeaderElevated] = useState(false);

  const createScrollHandler = useCallback(
    (sectionId) => (event) => {
      event.preventDefault();
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      setHeaderElevated(window.pageYOffset > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, company } = formData;
    const botField = formData['bot-field'];

    if (botField) {
      return;
    }

    if (name && email && company) {
      try {
        const payload = new URLSearchParams();
        payload.append('form-name', 'contact');
        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value);
        });

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }

        window.alert('Thank you for your inquiry. We will respond within 24 hours.');
        setFormData(() => ({ ...initialFormState }));
      } catch (error) {
        window.alert('There was a problem submitting your form. Please try again.');
        console.error('Form submission error:', error);
      }
    } else {
      window.alert('Please fill in all required fields.');
    }
  };

  return (
    <>
      <header className={headerElevated ? 'header-elevated' : ''}>
        <nav className="container">
          <div className="logo">HumchumCo</div>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={`#${link.href}`} onClick={createScrollHandler(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Manufacturing Excellence Through Data-Driven Solutions</h1>
                <p>
                  We partner with manufacturing companies to optimize operations, reduce costs, and drive
                  sustainable growth through proven lean methodologies and digital transformation.
                </p>
                <a href="#contact" className="cta-button" onClick={createScrollHandler('contact')}>
                  Schedule Consultation
                </a>
              </div>
              <div className="hero-stats">
                {heroStats.map((stat) => (
                  <div className="stat-item" key={stat.label}>
                    <span className="stat-number">{stat.value}</span>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <div className="about-content">
              <div className="credentials">
                <h4>Education &amp; Certifications</h4>
                {educationCredentials.map((item) => (
                  <p key={item}>{item}</p>
                ))}

                <h4 style={{ marginTop: '1.5rem' }}>Industry Focus</h4>
                {industryFocus.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="about-text">
                <h2>Transforming Operations Through Strategic Excellence</h2>
                <p>
                  With over 15 years of hands-on experience in manufacturing operations, I specialize in driving
                  measurable improvements in productivity, quality, and cost efficiency for mid to large-scale
                  manufacturing companies.
                </p>

                <p>
                  My approach combines proven lean methodologies with modern digital tools to create sustainable
                  operational excellence. I've successfully led enterprise-wide transformations at companies like Ashirvad
                  (Aliaxis) and Manjushree Technopack, delivering significant EBITDA improvements and establishing
                  self-sustaining improvement cultures.
                </p>

                <p>
                  I work closely with plant leadership, cross-functional teams, and C-level executives to align operational
                  initiatives with strategic business objectives, ensuring both immediate impact and long-term
                  sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <div className="section-header">
              <h2>Core Consulting Services</h2>
              <p>Comprehensive solutions designed to address your most critical operational challenges</p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div className="service-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className="case-studies">
          <div className="container">
            <div className="section-header">
              <h2>Client Success Stories</h2>
              <p>Real results from recent manufacturing transformation projects</p>
            </div>

            {caseStudies.map((study) => (
              <div className="case-study" key={study.title}>
                <h3>{study.title}</h3>
                <div className="case-study-content">
                  <div className="case-details">
                    {study.details.map((detail) => (
                      <p key={detail.heading}>
                        <strong>{detail.heading}:</strong> {detail.description}
                      </p>
                    ))}
                  </div>
                  <div className="case-metrics">
                    {study.metrics.map((metric) => (
                      <div className="metric" key={metric.label}>
                        <span className="metric-value">{metric.value}</span>
                        <div className="metric-label">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Let's Discuss Your Manufacturing Challenges</h2>
                <p>
                  Ready to transform your operations? Let's explore how we can work together to achieve measurable
                  improvements in efficiency, quality, and profitability.
                </p>

                <ul className="contact-details">
                  {contactDetails.map((detail) => (
                    <li key={detail.label}>
                      <strong>{detail.label}:</strong>
                      <span> {detail.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-form">
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label htmlFor="bot-field">
                      Don’t fill this out if you're human:
                      <input
                        id="bot-field"
                        name="bot-field"
                        value={formData['bot-field']}
                        onChange={handleInputChange}
                      />
                    </label>
                  </p>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Briefly describe your operational challenges and objectives..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 HumchumCo. Manufacturing Excellence Through Strategic Operations Consulting.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
