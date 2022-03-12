import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const {user, isLoading} = useUser();
  const router = useRouter();
  // const {mutate} = useSWRConfig(); // unboundmutation
  const {data, mutate:boundMutate} = useSWR<ItemDetailResponse>(router.query.id ? `/api/products/${router.query.id}`: null); // bound mutate
  // console.log(data);
  const [toggleFav, ] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    toggleFav({});
    if(!data) return;
    boundMutate((prev) => prev && {...prev, isLiked: !prev.isLiked}, false);// do not wait for previous action, updated cache
    /* 
    bound <-> unbound mutate
    bound: 해당 화면에서 얻은 데이터만 변경
    unbound: 해당 화면 외의 데이터를 변경
    */
  }
  return (
    <Layout canGoBack seoTitle="Product Detail">
      <div className="px-4  py-4">
        <div className="mb-8">
          {/* data?.product?.image */}
          <div className="relative  pb-80">
            <Image
              src={`https://imagedelivery.net/SInOkXlcrUS2Z98JsMiyVQ/${data?.product.image}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
            />
          </div>
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">  <Image
            width={48}
            height={48} 
            src={`https://imagedelivery.net/SInOkXlcrUS2Z98JsMiyVQ/${data?.product?.user?.avatar}/avatar`} 
            className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">{data?.product?.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{data?.product?.name}</h1>
            <span className="text-2xl block mt-3 text-gray-900">{data?.product?.price}</span>
            <p className=" my-6 text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button 
                onClick={onFavClick} 
                className={cls(
                  "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center", 
                  data?.isLiked ? 
                  "text-red-500 hover:text-red-600": 
                  "text-gray-400 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? 
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg> :
                  <svg
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                  </svg>
                }
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <Link key="singleProductHLINK" href={`/products/${product?.id}`}>
              <a key={product.userId}>
              <div key={product.id}>
                <div key = {product.image} className="h-56 w-full mb-4 bg-slate-300" />
                <h3 key = {product.name} className="text-gray-700 -mb-1">{product.name}</h3>
                <span key = {product.price} className="text-sm font-medium text-gray-900">${product.price}</span>
              </div>
              </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;