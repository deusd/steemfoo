/* eslint-disable */
import React from "react";

import {
  Platform,
  StyleSheet,
  Alert,
  CameraRoll,
  ActivityIndicator,
  Dimensions,
  Image,
  View
} from "react-native";
import {
  ActionSheet,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Text,
  Footer,
  FooterTab,
  Icon,
  Card,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import { getPosts } from "../state/steem";
import { Post } from "../types";

class PostsScreen extends React.Component {
  componentDidMount() {
    this.props.getPosts("latest", { tag: "steepshot", limit: 20 });
  }

  showLoadingPosts() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Loading posts<ActivityIndicator />
        </Text>
      </View>
    );
  }

  renderPost(post: Post) {
    return (
      <View key={post.id}>
        <View>
          <Text>{post.author}</Text>
          {post.location && <Text>{post.location}</Text>}
        </View>
        <Image
          style={{ width: "100%", aspectRatio: 1 }}
          src={{ uri: post.imageUrl }}
        />
        <View>
          <Text>{post.author}</Text>
          <Text>{post.title}</Text>
          {post.votes && <Text>{post.votes.length} likes</Text>}
        </View>
      </View>
    );
  }

  showPosts() {
    return <View>{this.props.posts.map(this.renderPost)}</View>;
  }

  render() {
    const { isLoadingPosts, posts } = this.props;

    return (
      <Container>
        <Header>
          <Body>
            <Title>VYBE</Title>
          </Body>
        </Header>
        <Content>
          <Body>
            {isLoadingPosts ? this.showLoadingPosts() : this.showPosts()}
          </Body>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ steem }) => ({
  ...steem
});
const mapDispatchToProps = {
  getPosts
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
