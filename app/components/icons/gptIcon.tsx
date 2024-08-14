interface GptIconProps extends React.ComponentPropsWithoutRef<"svg"> {
	size?: number | string;
	color?: string;
}

export const GptIcon = ({ size, color }: GptIconProps) => {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: "20%",
				overflow: "hidden",
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="100%"
				height="100%"
				viewBox="0,0,256,256"
				fill={color}
			>
				<g
					fill={color}
					fillRule="nonzero"
					stroke="none"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeMiterlimit="10"
					strokeDasharray=""
					strokeDashoffset="0"
					fontFamily="none"
					fontWeight="none"
					fontSize="none"
					textAnchor="none"
					style={{ mixBlendMode: "normal" }}
				>
					<path d="M0,256v-256h256v256z" id="bgRectangle"></path>
				</g>
				<g
					fill="#000000"
					fillRule="nonzero"
					stroke="none"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeMiterlimit="10"
					strokeDasharray=""
					strokeDashoffset="0"
					fontFamily="none"
					fontWeight="none"
					fontSize="none"
					textAnchor="none"
					style={{ mixBlendMode: "normal" }}
				>
					<g transform="scale(5.33333,5.33333)">
						<path d="M30.7,7.27l-2.37,1.83c-1.605,-2.067 -4.068,-3.209 -6.697,-3.092c-4.32,0.192 -7.633,3.945 -7.633,8.269v9.143l10.5,6.12l-1,1.72l-11.706,-6.827c-0.492,-0.287 -0.794,-0.813 -0.794,-1.382v-8.687c0,-6.264 5.129,-11.574 11.39,-11.357c3.279,0.113 6.29,1.656 8.31,4.263z"></path>
						<path d="M12.861,9.833l0.4,2.967c-2.592,0.357 -4.813,1.919 -6.026,4.254c-1.994,3.837 -0.4,8.582 3.345,10.745l7.918,4.571l10.55,-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282 -1.101,0.281 -1.594,-0.003l-7.523,-4.343c-5.426,-3.133 -7.46,-10.23 -4.142,-15.543c1.738,-2.784 4.58,-4.619 7.847,-5.065z"></path>
						<path d="M6.161,26.563l2.77,1.137c-0.987,2.423 -0.745,5.128 0.671,7.346c2.326,3.645 7.233,4.638 10.977,2.476l7.918,-4.572l0.05,-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569 -0.307,1.094 -0.8,1.379l-7.523,4.343c-5.425,3.132 -12.588,1.345 -15.531,-4.185c-1.541,-2.897 -1.71,-6.275 -0.463,-9.328z"></path>
						<path d="M17.3,40.73l2.37,-1.83c1.605,2.067 4.068,3.209 6.697,3.092c4.32,-0.192 7.633,-3.945 7.633,-8.269v-9.143l-10.5,-6.12l1,-1.72l11.706,6.827c0.492,0.287 0.794,0.813 0.794,1.382v8.687c0,6.264 -5.13,11.574 -11.39,11.358c-3.279,-0.114 -6.29,-1.657 -8.31,-4.264z"></path>
						<path d="M35.139,38.167l-0.4,-2.967c2.592,-0.357 4.813,-1.919 6.026,-4.254c1.994,-3.837 0.4,-8.582 -3.345,-10.745l-7.918,-4.571l-10.55,6.033l-0.99,-1.726l11.765,-6.724c0.494,-0.282 1.101,-0.281 1.594,0.003l7.523,4.343c5.425,3.132 7.459,10.229 4.141,15.543c-1.737,2.784 -4.579,4.619 -7.846,5.065z"></path>
						<path d="M41.839,21.437l-2.77,-1.137c0.987,-2.423 0.745,-5.128 -0.671,-7.346c-2.326,-3.645 -7.233,-4.638 -10.977,-2.476l-7.918,4.572l-0.05,12.153l-1.99,-0.006l0.059,-13.551c0.002,-0.569 0.307,-1.094 0.8,-1.379l7.523,-4.343c5.425,-3.132 12.588,-1.345 15.531,4.185c1.541,2.897 1.71,6.275 0.463,9.328z"></path>
					</g>
				</g>
			</svg>
		</div>
	);
};
