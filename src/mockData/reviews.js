import { user1, user2, user3 } from 'src/mockData/users'

export default reviews = [
    {
		title: 'Etude House BB Cream is The best BB Cream',
		user: user1,
		picture_cover_url: images.product1,
		product_price: 500,
		product: {
			name: 'Etude House BB Cream',
			brand: 'Etude'
		},
		comment_list: [
			{ 
				description: "Really useful and effective tips.", 
				user: user3,
				rating: 4
			},
			{ 
				description: "I like Bobbi Brown's BB Cream. It has features the other BB creams have like high SPF.", 
				user: user2,
				rating: 5
			},
			{ 
				description: "Really useful and effective tips.", 
				user: user3,
				rating: 4
			},
			{ 
				description: "Really useful and effective tips.", 
				user: user2,
				rating: 3
			}
		],
		rating: 1,
		overall_rating: 4.5,
		timestamp: '4 hours ago',
		content_list: [
			{	type: 'picture',
				value: images.product2
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			},
			{	type: 'picture',
				value: images.product3
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			}
		],
		tag_list: [ "Makeup and Beauty", "Cosmetic"]
	},
	{
		title: 'Skinfood Peach Cotton is The best BB Cream',
		user: user2,
		picture_cover_url: images.product2,
		product_price: 300,
		product: {
			name: 'Skinfood Peach Cotton',
			brand: 'Skinfood'
		},
		comment_list: [
			{ 
				description: "Really useful and effective tips.", 
				user: user3,
				rating: 4
			}
		],
		rating: 2,
		overall_rating: 3.5,
		timestamp: '6 hours ago',
		content_list: [
			{	type: 'picture',
				value: images.product2
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			},
			{	type: 'picture',
				value: images.product3
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			}
		],
		tag_list: [ "Makeup and Beauty", "Cosmetic"]
	}
]