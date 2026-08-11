import { NextResponse } from 'next/server';
import { salesData } from '../../data/salesData';

export async function GET() {
  return NextResponse.json({
    result: salesData,
    count: salesData.length
  });
}