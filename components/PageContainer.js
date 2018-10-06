import React from 'react'
import { Container, Content } from 'native-base'

const PageContainer = (props: any) => (
  <Container {...props}>
    <Content>{props.children}</Content>
  </Container>
)

export default PageContainer
