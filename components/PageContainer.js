import React from 'react'
import { Container, Content } from 'native-base'

const PageContainer = props => (
  <Container>
    <Content>{props.children}</Content>
  </Container>
)

export default PageContainer
