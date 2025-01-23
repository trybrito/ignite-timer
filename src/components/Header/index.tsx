import { HeaderContainer } from './styles';
import { Timer, Scroll } from 'phosphor-react';
import igniteLogo from '../../../public/ignite.svg';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer width={22} height={26} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll width={24} height={22} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
