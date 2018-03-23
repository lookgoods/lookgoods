import { review1, review2 } from 'src/mockData/reviews'

import images from 'src/constants/images'

export const user1 = {
	name: 'Phasin Sarunpornkul',
	profile_url: images.profile,
	follower_list: [user2, user3],
	following_list: [user2, user3],
	saved_review_list: [review1, review2],
	own_review_list: [review1, review2],
	description: 'My name is Phasin Sarunpornkul and I loved LookGoods :)'
}

export const user2 = {
	name: 'Paiiz Wanchanapon',
	profile_url: images.profile,
	follower_list: [user1, user3],
	following_list: [user1, user3],
	saved_review_list: [review1, review2],
	own_review_list: [review1, review2],
	description: 'My name is Paiiz Wanchanapon and I loved LookGoods :)'
}

export const user3 = {
	name: 'Steve Roger',
	profile_url: images.profile,
	follower_list: [user1, user2],
	following_list: [user1, user2],
	saved_review_list: [review1, review2],
	own_review_list: [review1, review2],
	description: 'My name is Steve Roger and I loved LookGoods :)'
}