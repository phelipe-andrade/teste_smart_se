import Footer from '../Footer';
import Header from '../Header'
import * as Styled from './styles';
import { ReactNode } from 'react';
import { ChildProps } from '@/protocols/ChildProps';


export default function MainContainer({children}: ChildProps) {
  return (
    <>
      <Header/>
      <Styled.Container>
        {children}
      </Styled.Container>
      <Footer/>
    </>
  )
}