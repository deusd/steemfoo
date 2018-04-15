import React from 'react'
import { Container, Content } from 'native-base'

const PageContainer = (props: any) => (
  <Container>
    <Content>{props.children}</Content>
  </Container>
)

export default PageContainer
