import moment from 'moment'
import { formatPost } from '../post'

const post = {
  id: 37871864,
  author: 'nico-dounavis',
  permlink: '20180310t185920673z-post',
  category: 'leopard',
  parent_author: '',
  parent_permlink: 'leopard',
  title: 'Leopard',
  body:
    "[![b6339845-929d-42ca-b897-3bbec39176a5.jpeg](http://steepshot.org/api/v1/image/b6339845-929d-42ca-b897-3bbec39176a5.jpeg)](https://alpha.steepshot.io/post/@nico-dounavis/20180310t185920673z-post)\n\n-   --  -   - ---  -- - -  -- - -   -----   --  -  - ----  -    -   - --\n\nLeopard having a rest after it's lunch\n\n-- -   -    -  ---- -  -  --   -----   - - --  - - --  --- -   -  --   -\n\n###### ![Steepshot_footer2.PNG](https://steemitimages.com/DQmd4wyZvtAUifJDLZD9vaqek17S1cUhN3PyEbFMMMgLW8o/Steepshot_footer2.PNG) Steepshot | [IPFS](http://steepshot.org/ipfs/Qmaca25rdv6dZemwKatS9yma3gbKi8Ro6NZ1nA4HfiWCK2) | [Google Play](https://play.google.com/store/apps/details?id=com.droid.steepshot)",
  json_metadata:
    '{"tags":["leopard","steepshot"],"thumbnails":{"256":"http://steepshot.org/api/v1/image/9764113c-45e8-4a55-8402-86efa9562ff5.jpeg","1024":"http://steepshot.org/api/v1/image/8b68eabf-1781-4d32-a3f2-9e05733bd077.jpeg"},"image":["http://steepshot.org/api/v1/image/b6339845-929d-42ca-b897-3bbec39176a5.jpeg"],"image_size":{"width":1280,"height":1024},"ipfs_photo":"Qmaca25rdv6dZemwKatS9yma3gbKi8Ro6NZ1nA4HfiWCK2","app":"steepshot/0.1.2.10"}',
  last_update: '2018-03-10T18:59:51',
  created: '2018-03-10T18:59:51',
  active: '2018-03-10T18:59:51',
  last_payout: '1970-01-01T00:00:00',
  depth: 0,
  children: 0,
  net_rshares: '1207000564908',
  abs_rshares: '1207000564908',
  vote_rshares: '1207000564908',
  children_abs_rshares: '1207000564908',
  cashout_time: '2018-03-17T18:59:51',
  max_cashout_time: '1969-12-31T23:59:59',
  total_vote_weight: 1099830,
  reward_weight: 10000,
  total_payout_value: '0.000 SBD',
  curator_payout_value: '0.000 SBD',
  author_rewards: 0,
  net_votes: 3,
  root_comment: 37871864,
  max_accepted_payout: '1000000.000 SBD',
  percent_steem_dollars: 10000,
  allow_replies: true,
  allow_votes: true,
  allow_curation_rewards: true,
  beneficiaries: [
    {
      account: 'steepshot',
      weight: 900,
    },
    {
      account: 'steepshot.fund',
      weight: 100,
    },
    {
      account: 'steepshot.pay',
      weight: 500,
    },
  ],
  url: '/leopard/@nico-dounavis/20180310t185920673z-post',
  root_title: 'Leopard',
  pending_payout_value: '5.174 SBD',
  total_pending_payout_value: '0.000 STEEM',
  active_votes: [
    {
      voter: 'liondani',
      weight: 157568,
      rshares: '1205926540808',
      percent: 10000,
      reputation: '66688775688384',
      time: '2018-03-10T19:04:09',
    },
    {
      voter: 'smailee',
      weight: 283,
      rshares: 592956645,
      percent: 10000,
      reputation: 427254188,
      time: '2018-03-10T19:35:18',
    },
    {
      voter: 'jeng',
      weight: 143,
      rshares: 481067455,
      percent: 10000,
      reputation: 334552143,
      time: '2018-03-10T19:18:42',
    },
  ],
  replies: [],
  author_reputation: '1846173713098',
  promoted: '0.000 SBD',
  body_length: 690,
  reblogged_by: [],
}

describe('post tests', () => {
  it('should transform a post correctly', () => {
    expect(formatPost(post)).toEqual({
      title: 'Leopard',
      id: 37871864,
      author: 'nico-dounavis',
      metadata: {
        tags: ['leopard', 'steepshot'],
        thumbnails: {
          '256':
            'http://steepshot.org/api/v1/image/9764113c-45e8-4a55-8402-86efa9562ff5.jpeg',
          '1024':
            'http://steepshot.org/api/v1/image/8b68eabf-1781-4d32-a3f2-9e05733bd077.jpeg',
        },
        image: [
          'http://steepshot.org/api/v1/image/b6339845-929d-42ca-b897-3bbec39176a5.jpeg',
        ],
        image_size: { width: 1280, height: 1024 },
        ipfs_photo: 'Qmaca25rdv6dZemwKatS9yma3gbKi8Ro6NZ1nA4HfiWCK2',
        app: 'steepshot/0.1.2.10',
      },
      url: post.url,
      created: moment('2018-03-10T18:59:51'),
      last_update: moment('2018-03-10T18:59:51'),
      active: moment('2018-03-10T18:59:51'),
      category: 'leopard',
      permalink: '20180310t185920673z-post',
    })
  })
})
