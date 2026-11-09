import { Link } from 'react-router-dom';
import { perfumes } from '../../data/perfumes';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-big">SÉRAPHINE</div>
      <div className="footer-grid">
        <div>
          <p className="footer-about">Fragrance, sculpted in light. SÉRAPHINE is a fictional concept brand created as a website sample.</p>
        </div>
        <div>
          <h4>Collection</h4>
          {perfumes.map((p) => (
            <Link key={p.slug} to={`/product/${p.slug}`}>
              {p.name}
            </Link>
          ))}
        </div>
        <div>
          <h4>Maison</h4>
          <Link to="/story">Our story</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/collection">All fragrances</Link>
        </div>
        <div>
          <h4>Follow</h4>
          <a href="#top" onClick={(e) => e.preventDefault()}>Instagram</a>
          <a href="#top" onClick={(e) => e.preventDefault()}>Journal</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SÉRAPHINE · Concept project — not a real brand</span>
        <span>Website sample by Veyora Studio</span>
      </div>
    </footer>
  );
}
