import { getNotionProperties } from '../utils';

const notionRecipes = await getNotionProperties({
	auth: import.meta.env.NOTION_API_KEY
});

const foods = await Promise.all(
	notionRecipes.map(async ({ properties }: any) => {
		/* 		console.log("recipe",properties.Description); */
		let title = '';
		let img = '';
		let description = '';
		if (properties.Picture.files[0]) {
			img = properties.Picture.files[0].file.url || '';
		}
		if (properties.Title.title[0]) {
			title = properties.Title.title[0].plain_text || '';
		}
		if (properties.Description.rich_text[0]) {
			description = properties.Description.rich_text[0].plain_text || '';
		}
		const isAvailable = properties.Available.checkbox;
		const price = properties.Price.number;
		return { img, title, isAvailable, price, description };
	})
);

export function NotionMenu() {

   return (
      <div className="flex flex-row flex-wrap gap-2">
      {
				foods.map((item) => (
					<div className="flex min-w-[18rem] flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
						<div className="flex h-[200px] w-[200px] items-center justify-center rounded-xl bg-white">
							{item.img !== '' ? (
								<img src={item?.img} alt="" width={200} height={200} />
							) : (
								<img src="/salad.webp" alt="" width={150} height={150} />
							)}
						</div>
						<div>
							<h4 className="mb-2 flex text-2xl font-bold text-gray-100">
								{item?.title !== '' ? item?.title : 'N/A'}
							</h4>
							{item?.description !== '' && (
								<p className="text-md my-2 text-gray-400">{item?.description}</p>
							)}
							<div>
								{item?.isAvailable ? (
									<div className=" my-2 flex w-min flex-row items-center gap-2 rounded-xl bg-green-300 p-1 px-2 text-xs">
										<div className="h-[5px] w-[5px] rounded-full bg-green-500" />
										<p className="text-gray-800">Available</p>
									</div>
								) : (
									<div className=" my-2 flex w-max flex-row items-center gap-2 rounded-xl bg-red-300 p-1 px-2 text-xs">
										<div className="h-[5px] w-[5px] rounded-full bg-red-500" />
										<p className="text-gray-800">Not Available</p>
									</div>
								)}
							</div>
							<p className="text-md text-amber-400">
								{item?.price
									? item?.price.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD'
									  })
									: 'N/A'}
							</p>
						</div>
					</div>
				))
			}
      </div>
   )
}

export default { NotionMenu }