import React from 'react'
import { Link } from 'react-router-dom'

import wave from './../assets/images/FooterWave.svg'
import { BadgeDollarSign, CreditCard, FacebookIcon, InstagramIcon, LinkedinIcon, LucidePhone, Phone, Smartphone, X } from 'lucide-react'
import { MobileStepper } from '@mui/material'

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <>
            <div className='m-0 '>
                <img src={wave} alt="" className='' />
                <div className='text-white bg-gray-800'>
                    <div className="grid md:grid-cols-4 grid-cols-2 mb-3 px-3">
                        <div className='my-2'>
                            <div className='font-bold text-xl mb-2'>R Market</div>
                            <div className='text-xs'>R Market : votre nouveau marché en ligne pour une expérience d'achat riche et simplifiée.</div>
                            <div className='flex justify-between w-2/4 my-2'>
                                <FacebookIcon className='cursor-pointer hover:text-blue-400 transition-all' size={20} />
                                <LinkedinIcon className='cursor-pointer hover:text-blue-400 transition-all' size={20} />
                                <InstagramIcon className='cursor-pointer hover:text-blue-400 transition-all' size={20} />
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='font-bold text-xl mb-2'>Acces Rapide</div>
                            <div className='text-xs'>
                                <div className='cursor-pointer space-y-1 flex flex-col'>
                                    <Link to='/cart' className='hover:underline hover:font-bold transition-all'>Panier</Link>
                                    <Link to='/view' className='hover:underline hover:font-bold transition-all'>Produits</Link>
                                    <Link to='/user' className='hover:underline hover:font-bold transition-all'>Utilisateur</Link>
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='font-bold text-xl mb-2'>Aide et Info</div>
                            <div className='text-xs'>
                                <ul className='cursor-pointer space-y-1'>
                                    <li className='hover:underline hover:font-bold transition-all'>Aide</li>
                                    <li className='hover:underline hover:font-bold transition-all'>Nous contacter</li>
                                    <li className='hover:underline hover:font-bold transition-all'>FAQs</li>
                                </ul>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='font-bold text-xl mb-2'>Contact</div>
                            <div className='text-xs'>Avez-vous des requêtes ou des suggestions ? <br />
                                Vous pouvez nous joindre : <i className='text-blue-300 underline cursor-pointer hover:font-bold hover:text-[14px] transition-all'>r.market@shop.com</i>
                            </div>
                        </div>
                    </div>
                    <div className='my-2 text-[10px]'>
                        <div className='font-bold text-base mb-2 text-center'>Option de Payement :</div>
                        <div className='flex justify-evenly'>
                            <div className='flex items-center'>
                                <Smartphone size={20} className='mr-2' /> Mobile Money
                            </div>
                            <div className='flex items-center'>
                                <CreditCard size={20} className='mr-2' /> Carte de crédit ou débit.
                            </div>
                            <div className='flex items-center'>
                                <BadgeDollarSign size={20} className='mr-2' /> Solde de Compte
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-gray-400 text-xs'>
                        <div className='text-center'>
                            &copy; CopyRight {year} R Market. Tous droits réservés.
                            Design Original de Wharton Aldrick
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer
